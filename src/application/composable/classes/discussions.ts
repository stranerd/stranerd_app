import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { DiscussionEntity, DiscussionFactory, DiscussionsUseCases } from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray, groupBy } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'

const groupGlobal = {} as Record<string, {
	discussions: Ref<DiscussionEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const classGlobal = {} as Record<string, {
	discussions: Ref<DiscussionEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const orderDiscussions = (discussions: DiscussionEntity[]) => {
	return groupBy(discussions.slice().reverse(), (d) => {
		const createdAt = new Date(d.createdAt)
		return new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate(), 0, 0, 0, 1).getTime()
	})
}

export const useGroupDiscussions = (classId: string, groupId: string) => {
	const { id } = useAuth()
	if (groupGlobal[groupId] === undefined) {
		const listener = useListener(async () => {
			const lastDate = groupGlobal[groupId].discussions.value[0]?.createdAt
			return DiscussionsUseCases.listenToGroupDiscussions(classId, groupId, {
				created: async (entity) => {
					addToArray(groupGlobal[groupId].discussions.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(groupGlobal[groupId].discussions.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = groupGlobal[groupId].discussions.value.findIndex((c) => c.id === entity.id)
					if (index !== -1) groupGlobal[groupId].discussions.value.splice(index, 1)
				}
			}, lastDate)
		})
		groupGlobal[groupId] = {
			discussions: ref([]),
			fetched: ref(false),
			hasMore: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchDiscussions = async () => {
		await groupGlobal[groupId].setError('')
		try {
			await groupGlobal[groupId].setLoading(true)
			const lastDate = groupGlobal[groupId].discussions.value.slice(-1)[0]?.createdAt
			const discussions = await DiscussionsUseCases.getGroupDiscussions(classId, groupId, lastDate)
			groupGlobal[groupId].hasMore.value = !!discussions.pages.next
			discussions.results.map((d) => addToArray(groupGlobal[groupId].discussions.value, d, (e) => e.id, (e) => e.createdAt))
			groupGlobal[groupId].fetched.value = true
		} catch (e) {
			await groupGlobal[groupId].setError(e)
		}
		await groupGlobal[groupId].setLoading(false)
	}

	const unReadDiscussions = computed(() => groupGlobal[groupId].discussions.value.filter((d) => !d.readAt[id.value]).length)

	onMounted(async () => {
		if (!groupGlobal[groupId].fetched.value && !groupGlobal[groupId].loading.value) await fetchDiscussions()
		await groupGlobal[groupId].listener.start()
	})
	onUnmounted(async () => {
		await groupGlobal[groupId].listener.close()
	})

	return {
		...groupGlobal[groupId],
		discussions: computed(() => orderDiscussions(groupGlobal[groupId].discussions.value)),
		fetchOlderDiscussions: fetchDiscussions, unReadDiscussions
	}
}

export const useClassDiscussions = (classId: string) => {
	if (classGlobal[classId] === undefined) {
		const listener = useListener(async () => {
			return DiscussionsUseCases.listenToClassLibrary(classId, {
				created: async (entity) => {
					addToArray(classGlobal[classId].discussions.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(classGlobal[classId].discussions.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = classGlobal[classId].discussions.value.findIndex((c) => c.id === entity.id)
					if (index !== -1) classGlobal[classId].discussions.value.splice(index, 1)
				}
			})
		})
		classGlobal[classId] = {
			discussions: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchDiscussions = async () => {
		await classGlobal[classId].setError('')
		try {
			await classGlobal[classId].setLoading(true)
			const discussions = await DiscussionsUseCases.getClassLibrary(classId)
			discussions.results.map((d) => addToArray(classGlobal[classId].discussions.value, d, (e) => e.id, (e) => e.createdAt))
			classGlobal[classId].fetched.value = true
		} catch (e) {
			await classGlobal[classId].setError(e)
		}
		await classGlobal[classId].setLoading(false)
	}

	onMounted(async () => {
		if (!classGlobal[classId].fetched.value && !classGlobal[classId].loading.value) await fetchDiscussions()
		await classGlobal[classId].listener.start()
	})
	onUnmounted(async () => {
		await classGlobal[classId].listener.close()
	})

	return { ...classGlobal[classId] }
}

export const useCreateDiscussion = (classId: string, groupId: string) => {
	const factory = ref(new DiscussionFactory()) as Ref<DiscussionFactory>
	const loadingCounter = ref(0)
	const { error, setError } = useErrorHandler()
	factory.value.groupId = groupId

	const createTextDiscussion = async () => {
		await setError('')
		if (factory.value.valid && !loadingCounter.value) {
			loadingCounter.value++
			try {
				await DiscussionsUseCases.add(classId, factory.value)
				factory.value.reset()
			} catch (e) {
				await setError(e)
			}
			loadingCounter.value--
			factory.value.reset()
		}
	}

	const createMediaDiscussion = async (factories: DiscussionFactory[]) => {
		if (!loadingCounter.value) await Promise.all(factories.map(async (mediaFactory) => {
			mediaFactory.groupId = groupId
			loadingCounter.value++
			try {
				await DiscussionsUseCases.add(classId, mediaFactory)
			} catch (error) {
				await setError(error)
			}
			loadingCounter.value--
		}))
	}

	return { factory, error, loadingCounter, createTextDiscussion, createMediaDiscussion }
}
