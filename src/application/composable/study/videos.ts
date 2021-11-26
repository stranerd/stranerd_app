import { onMounted, Ref, ref } from 'vue'
import { AddVideo, DeleteVideo, EditVideo, GetVideos, ListenToVideos, VideoEntity, VideoFactory } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@app/composable/core/notifications'

const global = {
	videos: ref([] as VideoEntity[]),
	fetched: ref(false),
	edit: ref(false),
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
	})

	return {
		...global, listener,
		fetchOlderVideos: fetchVideos
	}
}

export const useCreateVideo = () => {
	const factory = ref(new VideoFactory()) as Ref<VideoFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const createVideo = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AddVideo.call(factory.value)
				await setMessage('Video submitted successfully')
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
export const openVideoEditModal = (video: VideoEntity) => {
	editingVideo = video
}
export const useEditVideo = (videoId: string) => {
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
				await EditVideo.call(videoId, factory.value)
				await setMessage('Video edited successfully')
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
			text: 'This cannot be reversed',
			icon: 'warning',
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

export const useEdit = ()=>{
	const toggle = ()=>{
		console.log(global.edit.value)
		global.edit.value = !global.edit.value
	}

	return {
		toggle
	}
}