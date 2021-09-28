import { computed, Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetTagQuestions, ListenToTagQuestions, QuestionEntity } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

enum Answered {
	All,
	BestAnswered,
	Answered,
	Unanswered
}

const answeredChoices = [
	{ val: Answered.All, key: 'All' },
	{ val: Answered.BestAnswered, key: 'Best Answered' },
	{ val: Answered.Answered, key: 'Answered' },
	{ val: Answered.Unanswered, key: 'Unanswered' }
]

const global = {} as Record<string, {
	questions: Ref<QuestionEntity[]>;
	fetched: Ref<boolean>;
	hasMore: Ref<boolean>;
	subjectId: Ref<string>;
	answered: Ref<Answered>;
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToQuestionList = (tag: string, question: QuestionEntity) => {
	const index = global[tag].questions.value.findIndex((q) => q.id === question.id)
	if (index !== -1) global[tag].questions.value.splice(index, 1, question)
	else global[tag].questions.value.push(question)
}

const unshiftToQuestionList = (tag: string, question: QuestionEntity) => {
	const index = global[tag].questions.value.findIndex((q) => q.id === question.id)
	if (index !== -1) global[tag].questions.value.splice(index, 1, question)
	else global[tag].questions.value.unshift(question)
}

export const useTagQuestionList = (tag: string) => {
	if (global[tag] === undefined) global[tag] = {
		questions: ssrRef([]),
		subjectId: ssrRef(''),
		fetched: ssrRef(false),
		hasMore: ssrRef(false),
		answered: ssrRef(answeredChoices[0].val),
		...useErrorHandler(),
		...useLoadingHandler()
	}
	const listener = useListener(async () => {
		const lastDate = global[tag].questions.value[0]?.createdAt
		return await ListenToTagQuestions.call(tag, {
			created: async (entity) => {
				unshiftToQuestionList(tag, entity)
			},
			updated: async (entity) => {
				unshiftToQuestionList(tag, entity)
			},
			deleted: async (entity) => {
				const index = global[tag].questions.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global[tag].questions.value.splice(index, 1)
			}
		}, lastDate)
	})
	const filteredQuestions = computed({
		get: () => global[tag].questions.value.filter((q) => {
			if (global[tag].subjectId.value && q.subjectId !== global[tag].subjectId.value) return false
			if (global[tag].answered.value === Answered.Answered && q.answers.length === 0) return false
			if (global[tag].answered.value === Answered.Unanswered && q.answers.length > 0) return false
			if (global[tag].answered.value === Answered.BestAnswered && !q.isAnswered) return false
			return true
		}).sort((a, b) => {
			return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
		}), set: (questions) => {
			questions.map((q) => pushToQuestionList(tag, q))
		}
	})

	const fetchQuestions = async () => {
		await global[tag].setError('')
		try {
			await global[tag].setLoading(true)
			const lastDate = global[tag].questions.value[global[tag].questions.value.length - 1]?.createdAt
			const questions = await GetTagQuestions.call(tag, lastDate)
			global[tag].hasMore.value = !!questions.pages.next
			questions.results.forEach((q) => pushToQuestionList(tag, q))
			global[tag].fetched.value = true
		} catch (error) {
			await global[tag].setError(error)
		}
		await global[tag].setLoading(false)
	}

	useFetch(async () => {
		if (!global[tag].fetched.value && !global[tag].loading.value) await fetchQuestions()
	})

	return { ...global[tag], listener, filteredQuestions, answeredChoices, fetchOlderQuestions: fetchQuestions }
}
