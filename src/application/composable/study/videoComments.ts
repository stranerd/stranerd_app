import { onUnmounted, onMounted, ref, Ref } from 'vue'
import {
	AddComment,
	CommentEntity,
	CommentFactory,
	CommentType,
	GetVideoComments,
	ListenToVideoComments
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'

const global = {} as Record<string, {
	comments: Ref<CommentEntity[]>
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useVideoCommentsList = (videoId: string) => {
	if (global[videoId] === undefined) global[videoId] = {
		comments: ref([]),
		fetched: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchComments = async () => {
		await global[videoId].setError('')
		try {
			await global[videoId].setLoading(true)
			global[videoId].comments.value = (await GetVideoComments.call(videoId)).results
			global[videoId].fetched.value = true
		} catch (error) {
			await global[videoId].setError(error)
		}
		await global[videoId].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToVideoComments.call(videoId, {
			created: async (entity) => {
				const index = global[videoId].comments.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[videoId].comments.value.push(entity)
				else global[videoId].comments.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = global[videoId].comments.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[videoId].comments.value.push(entity)
				else global[videoId].comments.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				global[videoId].comments.value = global[videoId].comments.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[videoId].fetched.value && !global[videoId].loading.value) await fetchComments()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})
	return {
		error: global[videoId].error,
		loading: global[videoId].loading,
		comments: global[videoId].comments
	}
}

export const useCreateVideoComments = (videoId: string) => {
	const factory = ref(new CommentFactory(CommentType.video)) as Ref<CommentFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	factory.value.videoId = videoId

	const createComment = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AddComment.call(factory.value)
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading,
		createComment
	}
}
