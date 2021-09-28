import { Ref, ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import {
	AddAnswerComment,
	CommentEntity,
	CommentFactory,
	GetAnswerComments,
	ListenToAnswerComments
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {} as Record<string, {
	comments: Ref<CommentEntity[]>,
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useAnswerCommentList = (answerId: string) => {
	if (global[answerId] === undefined) global[answerId] = {
		comments: ssrRef([]),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchComments = async () => {
		await global[answerId].setError('')
		try {
			await global[answerId].setLoading(true)
			global[answerId].comments.value = (await GetAnswerComments.call(answerId)).results
			global[answerId].fetched.value = true
		} catch (error) {
			await global[answerId].setError(error)
		}
		await global[answerId].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToAnswerComments.call(answerId, {
			created: async (entity) => {
				const index = global[answerId].comments.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[answerId].comments.value.push(entity)
				else global[answerId].comments.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = global[answerId].comments.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[answerId].comments.value.push(entity)
				else global[answerId].comments.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				global[answerId].comments.value = global[answerId].comments.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	useFetch(async () => {
		if (!global[answerId].fetched.value && !global[answerId].loading.value) await fetchComments()
	})

	return {
		error: global[answerId].error,
		loading: global[answerId].loading,
		comments: global[answerId].comments,
		listener
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
				await AddAnswerComment.call(answerId, factory.value)
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
