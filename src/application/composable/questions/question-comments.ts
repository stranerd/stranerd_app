import { Ref, ref, onMounted } from 'vue'
import {
	AddQuestionComment,
	CommentEntity,
	CommentFactory,
	GetQuestionComments,
	ListenToQuestionComments
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'

const global = {} as Record<string, {
	comments: Ref<CommentEntity[]>;
	fetched: Ref<boolean>;
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useQuestionCommentList = (questionId: string) => {
	if (global[questionId] === undefined) global[questionId] = {
		comments: ref([]),
		fetched: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchComments = async () => {
		await global[questionId].setError('')
		try {
			await global[questionId].setLoading(true)
			global[questionId].comments.value = (await GetQuestionComments.call(questionId)).results
			global[questionId].fetched.value = true
		} catch (error) {
			await global[questionId].setError(error)
		}
		await global[questionId].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToQuestionComments.call(questionId, {
			created: async (entity) => {
				const index = global[questionId].comments.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[questionId].comments.value.push(entity)
				else global[questionId].comments.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = global[questionId].comments.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[questionId].comments.value.push(entity)
				else global[questionId].comments.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				global[questionId].comments.value = global[questionId].comments.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[questionId].fetched.value && !global[questionId].loading.value) await fetchComments()
	})

	return {
		error: global[questionId].error,
		loading: global[questionId].loading,
		comments: global[questionId].comments,
		listener
	}
}

export const useCreateQuestionComments = (questionId: string) => {
	const factory = ref(new CommentFactory()) as Ref<CommentFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const createComment = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AddQuestionComment.call(questionId, factory.value)
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
