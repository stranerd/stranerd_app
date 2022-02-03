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

const global = {
	videos: ref([] as VideoEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToVideoList = (video: VideoEntity) => {
	const index = global.videos.value.findIndex((q) => q.id === video.id)
	if (index !== -1) global.videos.value.splice(index, 1, video)
	else global.videos.value.push(video)
}
const unshiftToVideoList = (video: VideoEntity) => {
	const index = global.videos.value.findIndex((q) => q.id === video.id)
	if (index !== -1) global.videos.value.splice(index, 1, video)
	else global.videos.value.unshift(video)
}

export const useVideoList = () => {
	const fetchVideos = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const lastDate = global.videos.value[global.videos.value.length - 1]?.createdAt
			const videos = await GetVideos.call(lastDate)
			global.hasMore.value = !!videos.pages.next
			videos.results.forEach(pushToVideoList)
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const listener = useListener(async () => {
		const lastDate = global.videos.value[global.videos.value.length - 1]?.createdAt
		return await ListenToVideos.call({
			created: async (entity) => {
				unshiftToVideoList(entity)
			},
			updated: async (entity) => {
				unshiftToVideoList(entity)
			},
			deleted: async (entity) => {
				const index = global.videos.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.videos.value.splice(index, 1)
			}
		}, lastDate ? lastDate - 1 : undefined)
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchVideos()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})
	return { ...global, fetchOlderVideos: fetchVideos }
}

export const useCreateVideo = () => {
	const factory = ref(new VideoFactory()) as Ref<VideoFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()

	const createVideo = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const videoId = await AddVideo.call(factory.value)
				await setMessage('Video submitted successfully')
				await router.push(`/study/videos/${videoId}`)
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
export const useEditVideo = (videoId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()
	const factory = ref(new VideoFactory()) as Ref<VideoFactory>
	if (editingVideo) factory.value.loadEntity(editingVideo)

	const editVideo = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await EditVideo.call(videoId, factory.value)
				await setMessage('Video updated successfully')
				await router.push(`/study/videos/${videoId}`)
				factory.value.reset()
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
			if (q) pushToVideoList(q)
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
			if (video) unshiftToVideoList(video)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await ListenToVideo.call(videoId, {
			created: async (entity) => {
				unshiftToVideoList(entity)
			},
			updated: async (entity) => {
				unshiftToVideoList(entity)
			},
			deleted: async (entity) => {
				const index = global.videos.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.videos.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		await fetchVideo()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { error, loading, video }
}
