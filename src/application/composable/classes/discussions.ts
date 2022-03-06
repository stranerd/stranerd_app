import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import {
	AddDiscussion,
	DiscussionEntity,
	DiscussionFactory,
	GetDiscussions,
	ListenToDiscussions
} from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { getRandomValue } from '@utils/commons'
import { Media } from '@modules/core'

const global = {} as Record<string, {
	discussions: Ref<DiscussionEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToDiscussions = (userId: string, discussion: DiscussionEntity) => {
	const index = global[userId].discussions.value.findIndex((c) => c.id === discussion.id)
	if (index !== -1) global[userId].discussions.value.splice(index, 1, discussion)
	else global[userId].discussions.value.push(discussion)
}
const unshiftToDiscussions = (userId: string, discussion: DiscussionEntity) => {
	const index = global[userId].discussions.value.findIndex((c) => c.id === discussion.id)
	if (index !== -1) global[userId].discussions.value.splice(index, 1, discussion)
	else global[userId].discussions.value.unshift(discussion)
}

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

export const useDiscussions = (groupId: string) => {
	if (global[groupId] === undefined) {
		const listener = useListener(async () => {
			const lastDate = global[groupId].discussions.value[0]?.createdAt
			return ListenToDiscussions.call(groupId, {
				created: async (entity) => {
					unshiftToDiscussions(groupId, entity)
				},
				updated: async (entity) => {
					pushToDiscussions(groupId, entity)
				},
				deleted: async (entity) => {
					const index = global[groupId].discussions.value.findIndex((c) => c.id === entity.id)
					if (index !== -1) global[groupId].discussions.value.splice(index, 1)
				}
			}, lastDate)
		})
		global[groupId] = {
			discussions: ref([]),
			fetched: ref(false),
			hasMore: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchDiscussions = async () => {
		await global[groupId].setError('')
		try {
			await global[groupId].setLoading(true)
			const lastDate = global[groupId].discussions.value[global[groupId].discussions.value.length - 1]?.createdAt
			const c = await GetDiscussions.call(groupId, lastDate)
			global[groupId].hasMore.value = !!c.pages.next
			c.results.map((c) => pushToDiscussions(groupId, c))
			global[groupId].fetched.value = true
		} catch (e) {
			await global[groupId].setError(e)
		}
		await global[groupId].setLoading(false)
	}

	onMounted(async () => {
		if (!global[groupId].fetched.value && !global[groupId].loading.value) await fetchDiscussions()
		await global[groupId].listener.startListener()
	})
	onUnmounted(async () => {
		await global[groupId].listener.closeListener()
	})

	return {
		...global[groupId],
		discussions: computed(() => orderDiscussions(global[groupId].discussions.value)),
		fetchOlderDiscussions: fetchDiscussions
	}
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

	const createMediaDiscussion = async (files: Media[]) => {
		if (!loading.value) {
			await setLoading(true)
			const promises = files.map(async (file) => {
				const mediaFactory = new DiscussionFactory()
				mediaFactory.groupId = groupId
				mediaFactory.media = file
				try {
					await AddDiscussion.call(mediaFactory)
				} catch (error) {
					await setError(error)
				}
			})
			await Promise.all(promises)
			await setLoading(false)
		}
	}

	return { factory, error, loading, createTextDiscussion, createMediaDiscussion }
}
