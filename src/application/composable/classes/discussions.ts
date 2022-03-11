import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import {
	AddDiscussion,
	DiscussionEntity,
	DiscussionFactory,
	GetClassDiscussions,
	GetGroupDiscussions,
	ListenToClassDiscussions,
	ListenToGroupDiscussions
} from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { getRandomValue } from '@utils/commons'

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
	const isSameDay = (date1: Date, date2: Date) => date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	const res = [] as DiscussionEntity[][]
	discussions
		.sort((a, b) => a.createdAt - b.createdAt)
		.forEach((discussion, index) => {
			const lastDiscussion = discussions[index - 1]
			if (index === 0 || !isSameDay(new Date(discussion.createdAt), new Date(lastDiscussion.createdAt))) return res.push([discussion])
			else return res[res.length - 1].push(discussion)
		})
	return res.map((discussions) => {
		const date = discussions[0].createdAt
		return { discussions, date, hash: getRandomValue() }
	})
}

export const useGroupDiscussions = (groupId: string) => {
	if (groupGlobal[groupId] === undefined) {
		const listener = useListener(async () => {
			const lastDate = groupGlobal[groupId].discussions.value[0]?.createdAt
			return ListenToGroupDiscussions.call(groupId, {
				created: async (entity) => {
					unshiftToDiscussions(groupId, entity)
				},
				updated: async (entity) => {
					pushToDiscussions(groupId, entity)
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

	const pushToDiscussions = (groupId: string, discussion: DiscussionEntity) => {
		const index = groupGlobal[groupId].discussions.value.findIndex((c) => c.id === discussion.id)
		if (index !== -1) groupGlobal[groupId].discussions.value.splice(index, 1, discussion)
		else groupGlobal[groupId].discussions.value.push(discussion)
	}
	const unshiftToDiscussions = (groupId: string, discussion: DiscussionEntity) => {
		const index = groupGlobal[groupId].discussions.value.findIndex((c) => c.id === discussion.id)
		if (index !== -1) groupGlobal[groupId].discussions.value.splice(index, 1, discussion)
		else groupGlobal[groupId].discussions.value.unshift(discussion)
	}

	const fetchDiscussions = async () => {
		await groupGlobal[groupId].setError('')
		try {
			await groupGlobal[groupId].setLoading(true)
			const lastDate = groupGlobal[groupId].discussions.value[groupGlobal[groupId].discussions.value.length - 1]?.createdAt
			const discussions = await GetGroupDiscussions.call(groupId, lastDate)
			groupGlobal[groupId].hasMore.value = !!discussions.pages.next
			discussions.results.map((d) => pushToDiscussions(groupId, d))
			groupGlobal[groupId].fetched.value = true
		} catch (e) {
			await groupGlobal[groupId].setError(e)
		}
		await groupGlobal[groupId].setLoading(false)
	}

	onMounted(async () => {
		if (!groupGlobal[groupId].fetched.value && !groupGlobal[groupId].loading.value) await fetchDiscussions()
		await groupGlobal[groupId].listener.startListener()
	})
	onUnmounted(async () => {
		await groupGlobal[groupId].listener.closeListener()
	})

	return {
		...groupGlobal[groupId],
		discussions: computed(() => orderDiscussions(groupGlobal[groupId].discussions.value)),
		fetchOlderDiscussions: fetchDiscussions
	}
}

export const useClassDiscussions = (classId: string) => {
	if (classGlobal[classId] === undefined) {
		const listener = useListener(async () => {
			return ListenToClassDiscussions.call(classId, {
				created: async (entity) => {
					unshiftToDiscussions(classId, entity)
				},
				updated: async (entity) => {
					pushToDiscussions(classId, entity)
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

	const pushToDiscussions = (classId: string, discussion: DiscussionEntity) => {
		const index = classGlobal[classId].discussions.value.findIndex((c) => c.id === discussion.id)
		if (index !== -1) classGlobal[classId].discussions.value.splice(index, 1, discussion)
		else classGlobal[classId].discussions.value.push(discussion)
	}
	const unshiftToDiscussions = (classId: string, discussion: DiscussionEntity) => {
		const index = classGlobal[classId].discussions.value.findIndex((c) => c.id === discussion.id)
		if (index !== -1) classGlobal[classId].discussions.value.splice(index, 1, discussion)
		else classGlobal[classId].discussions.value.unshift(discussion)
	}

	const fetchDiscussions = async () => {
		await classGlobal[classId].setError('')
		try {
			await classGlobal[classId].setLoading(true)
			const discussions = await GetClassDiscussions.call(classId)
			discussions.results.map((d) => pushToDiscussions(classId, d))
			classGlobal[classId].fetched.value = true
		} catch (e) {
			await classGlobal[classId].setError(e)
		}
		await classGlobal[classId].setLoading(false)
	}

	onMounted(async () => {
		if (!classGlobal[classId].fetched.value && !classGlobal[classId].loading.value) await fetchDiscussions()
		await classGlobal[classId].listener.startListener()
	})
	onUnmounted(async () => {
		await classGlobal[classId].listener.closeListener()
	})

	return { ...classGlobal[classId] }
}

export const useCreateDiscussion = (groupId: string) => {
	const factory = ref(new DiscussionFactory()) as Ref<DiscussionFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	factory.value.groupId = groupId

	const createTextDiscussion = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AddDiscussion.call(factory.value)
				factory.value.reset()
			} catch (e) {
				await setError(e)
			}
			factory.value.reset()
			await setLoading(false)
		}
	}

	const createMediaDiscussion = async (factories: DiscussionFactory[]) => {
		if (!loading.value) {
			await setLoading(true)
			await Promise.all(factories.map(async (mediaFactory) => {
				mediaFactory.groupId = groupId
				try {
					await AddDiscussion.call(mediaFactory)
				} catch (error) {
					await setError(error)
				}
			}))
			await setLoading(false)
		}
	}

	return { factory, error, loading, createTextDiscussion, createMediaDiscussion }
}
