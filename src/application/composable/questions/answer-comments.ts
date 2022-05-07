import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { AnswerCommentsUseCases, CommentEntity, CommentFactory } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	comments: Ref<CommentEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useAnswerCommentList = (answerId: string) => {
	if (global[answerId] === undefined) {
		const listener = useListener(async () => {
			return await AnswerCommentsUseCases.listen(answerId, {
				created: async (entity) => {
					addToArray(global[answerId].comments.value, entity, (e) => e.id, (e) => e.createdAt, true)
				},
				updated: async (entity) => {
					addToArray(global[answerId].comments.value, entity, (e) => e.id, (e) => e.createdAt, true)
				},
				deleted: async (entity) => {
					global[answerId].comments.value = global[answerId].comments.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		global[answerId] = {
			comments: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchComments = async () => {
		await global[answerId].setError('')
		try {
			await global[answerId].setLoading(true)
			const comments = await AnswerCommentsUseCases.get(answerId)
			comments.results.forEach((c) => addToArray(global[answerId].comments.value, c, (e) => e.id, (e) => e.createdAt, true))
			global[answerId].fetched.value = true
		} catch (error) {
			await global[answerId].setError(error)
		}
		await global[answerId].setLoading(false)
	}

	onMounted(async () => {
		if (!global[answerId].fetched.value && !global[answerId].loading.value) await fetchComments()
		await global[answerId].listener.start()
	})
	onUnmounted(async () => {
		await global[answerId].listener.close()
	})

	return {
		error: global[answerId].error,
		loading: global[answerId].loading,
		comments: global[answerId].comments
	}
}

export const useCreateAnswerComments = (answerId: string) => {
	const factory = ref(new CommentFactory()) as Ref<CommentFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const createComment = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AnswerCommentsUseCases.add(answerId, factory.value)
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
