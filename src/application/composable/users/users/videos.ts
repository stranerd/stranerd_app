import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { VideoEntity, VideosUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	videos: Ref<VideoEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

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
			const videos = await VideosUseCases.getUserVideos(id, lastDate)
			global[id].hasMore.value = !!videos.pages.next
			videos.results.forEach((q) => addToArray(global[id].videos.value, q, (e) => e.id, (e) => e.createdAt))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await VideosUseCases.listenToUserVideos(id, {
			created: async (entity) => {
				addToArray(global[id].videos.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global[id].videos.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				global[id].videos.value = global[id].videos.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchVideos()
		await listener.start()
	})

	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global[id], fetchOlderVideos: fetchVideos }
}
