import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { GetUserVideos, ListenToUserVideos, VideoEntity } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'

const global = {} as Record<string, {
	videos: Ref<VideoEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToVideoList = (id: string, video: VideoEntity) => {
	const index = global[id].videos.value.findIndex((q) => q.id === video.id)
	if (index !== -1) global[id].videos.value.splice(index, 1, video)
	else global[id].videos.value.push(video)
}

export const useUserVideoList = (id: string) => {
	if (global[id] === undefined) global[id] = {
		videos: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchVideos = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const lastDate = global[id].videos.value[global[id].videos.value.length - 1]?.createdAt
			const videos = await GetUserVideos.call(id, lastDate)
			global[id].hasMore.value = !!videos.pages.next
			videos.results.forEach((q) => pushToVideoList(id, q))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToUserVideos.call(id, {
			created: async (entity) => {
				const index = global[id].videos.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].videos.value.unshift(entity)
				else global[id].videos.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = global[id].videos.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].videos.value.unshift(entity)
				else global[id].videos.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				global[id].videos.value = global[id].videos.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchVideos()
		await listener.startListener()
	})

	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global[id], fetchOlderVideos: fetchVideos }
}
