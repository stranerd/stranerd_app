import { onMounted, ref, Ref } from 'vue'
import { GetSimilarQuestions, ListenToSimilarQuestions, QuestionEntity } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'

const global = {} as Record<string, {
	questions: Ref<QuestionEntity[]>
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useSimilarQuestionList = (question: QuestionEntity) => {
	if (global[question.id] === undefined) global[question.id] = {
		questions: ref([]),
		fetched: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchQuestions = async () => {
		await global[question.id].setError('')
		try {
			await global[question.id].setLoading(true)
			global[question.id].questions.value = (await GetSimilarQuestions.call(question.id, question.tags)).results
			global[question.id].fetched.value = true
		} catch (error) {
			await global[question.id].setError(error)
		}
		await global[question.id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToSimilarQuestions.call(question.id, question.tags, {
			created: async (entity) => {
				const index = global[question.id].questions.value.findIndex((q) => q.id === entity.id)
				if (index > -1) global[question.id].questions.value.splice(index, 1, entity)
				else global[question.id].questions.value.unshift(entity)
			},
			updated: async (entity) => {
				const index = global[question.id].questions.value.findIndex((q) => q.id === entity.id)
				if (index > -1) global[question.id].questions.value.splice(index, 1, entity)
				else global[question.id].questions.value.unshift(entity)
			},
			deleted: async (entity) => {
				const index = global[question.id].questions.value.findIndex((q) => q.id === entity.id)
				if (index > -1) global[question.id].questions.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		if (!global[question.id].fetched.value && !global[question.id].loading.value) await fetchQuestions()
	})

	return {
		error: global[question.id].error,
		loading: global[question.id].loading,
		questions: global[question.id].questions,
		listener
	}
}
