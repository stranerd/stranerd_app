import { computed, onMounted, onUnmounted, ref, Ref, watch } from 'vue'
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
import { addToArray, groupBy } from '@utils/commons'
import { storage } from '@utils/storage'
import { getGroupReadStateKey, saveClassGroupsReadTime } from '@app/composable/classes/groups'

const groupGlobal = {} as Record<string, {
	discussions: Ref<DiscussionEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
	readTime: Ref<number>
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

const getReadStateKey = (groupId: string) => `classes-groups-${groupId}-discussions`

export const useGroupDiscussions = (groupId: string) => {
	if (groupGlobal[groupId] === undefined) {
		const listener = useListener(async () => {
			const lastDate = groupGlobal[groupId].discussions.value[0]?.createdAt
			return ListenToGroupDiscussions.call(groupId, {
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
			readTime: ref(0),
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
			const discussions = await GetGroupDiscussions.call(groupId, lastDate)
			groupGlobal[groupId].hasMore.value = !!discussions.pages.next
			discussions.results.map((d) => addToArray(groupGlobal[groupId].discussions.value, d, (e) => e.id, (e) => e.createdAt))
			groupGlobal[groupId].fetched.value = true
		} catch (e) {
			await groupGlobal[groupId].setError(e)
		}
		await groupGlobal[groupId].setLoading(false)
	}

	watch(() => groupGlobal[groupId].readTime.value, async () => await storage.set(getReadStateKey(groupId), groupGlobal[groupId].readTime.value))
	const unReadDiscussions = computed(() => groupGlobal[groupId].discussions.value.filter((d) => d.createdAt > groupGlobal[groupId].readTime.value).length)

	onMounted(async () => {
		if (!groupGlobal[groupId].fetched.value && !groupGlobal[groupId].loading.value) await fetchDiscussions()
		const lastRead = await storage.get(getReadStateKey(groupId))
		if (lastRead) groupGlobal[groupId].readTime.value = lastRead
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

export const saveDiscussionsReadState = async (discussion: DiscussionEntity) => {
	const key = getReadStateKey(discussion.groupId)
	const lastRead = await storage.get(key)
	if (lastRead < discussion.createdAt) {
		await storage.set(key, discussion.createdAt)
		if (groupGlobal[discussion.groupId]) groupGlobal[discussion.groupId].readTime.value = discussion.createdAt
	}

	const groupKey = getGroupReadStateKey(discussion.classId)
	const groupLastRead = await storage.get(groupKey)
	if (groupLastRead < discussion.createdAt) {
		await storage.set(groupKey, discussion.createdAt)
		saveClassGroupsReadTime(discussion.classId, discussion.createdAt)
	}
}

export const useClassDiscussions = (classId: string) => {
	if (classGlobal[classId] === undefined) {
		const listener = useListener(async () => {
			return ListenToClassDiscussions.call(classId, {
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
			const discussions = await GetClassDiscussions.call(classId)
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
