import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import {
	AddVideo,
	DeleteVideo,
	EditVideo,
	FindVideo,
	GetVideos,
	ListenToVideo,
	ListenToVideos,
	VideoEntity,
	VideoFactory
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { Router, useRouter } from 'vue-router'
import { addToArray } from '@utils/commons'
import { useStudyModal } from '@app/composable/core/modals'

const global = {
	videos: ref([] as VideoEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	const lastDate = global.videos.value[global.videos.value.length - 1]?.createdAt
	return await ListenToVideos.call({
		created: async (entity) => {
			addToArray(global.videos.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		updated: async (entity) => {
			addToArray(global.videos.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		deleted: async (entity) => {
			const index = global.videos.value.findIndex((q) => q.id === entity.id)
			if (index !== -1) global.videos.value.splice(index, 1)
		}
	}, lastDate)
})

export const useVideoList = () => {
	const fetchVideos = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const lastDate = global.videos.value[global.videos.value.length - 1]?.createdAt
			const videos = await GetVideos.call(lastDate)
			global.hasMore.value = !!videos.pages.next
			videos.results.forEach((v) => addToArray(global.videos.value, v, (e) => e.id, (e) => e.createdAt))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchVideos()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global, fetchOlderVideos: fetchVideos }
}

export const useCreateVideo = () => {
	const router = useRouter()
	const factory = ref(new VideoFactory()) as Ref<VideoFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const createVideo = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const video = await AddVideo.call(factory.value)
				await setMessage('Video submitted successfully')
				await useStudyModal().closeCreateVideo()
				await router.push(`/study/videos/${video.id}`)
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, createVideo }
}

let editingVideo = null as VideoEntity | null
export const getEditingVideo = () => editingVideo
export const openVideoEditModal = async (video: VideoEntity, router: Router) => {
	editingVideo = video
	await router.push(`/study/videos/${video.id}/edit`)
}
export const useEditVideo = () => {
	const router = useRouter()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new VideoFactory()) as Ref<VideoFactory>
	if (editingVideo) factory.value.loadEntity(editingVideo)

	const editVideo = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const video = await EditVideo.call(editingVideo!.id, factory.value)
				await useStudyModal().closeEditVideo()
				await setMessage('Video updated successfully')
				factory.value.reset()
				await router.push(`/study/videos/${video.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editVideo }
}

export const useDeleteVideo = (videoId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteVideo = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this video?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteVideo.call(videoId)
				global.videos.value = global.videos.value
					.filter((q) => q.id !== videoId)
				await setMessage('Video deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteVideo }
}

export const useVideo = (videoId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const video = computed({
		get: () => global.videos.value.find((q) => q.id === videoId) ?? null,
		set: (q) => {
			if (q) addToArray(global.videos.value, q, (e) => e.id, (e) => e.createdAt)
		}
	})

	const fetchVideo = async () => {
		await setError('')
		try {
			await setLoading(true)
			let video = global.videos.value.find((q) => q.id === videoId) ?? null
			if (video) {
				await setLoading(false)
				return
			}
			video = await FindVideo.call(videoId)
			if (video) addToArray(global.videos.value, video, (e) => e.id, (e) => e.createdAt)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await ListenToVideo.call(videoId, {
			created: async (entity) => {
				addToArray(global.videos.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global.videos.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				const index = global.videos.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.videos.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		await fetchVideo()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { error, loading, video }
}
