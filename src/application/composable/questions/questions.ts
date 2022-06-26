import { computed, onMounted, onUnmounted, Ref, ref, watch } from 'vue'
import { Router, useRouter } from 'vue-router'
import { QuestionEntity, QuestionFactory, QuestionsUseCases } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'

enum Answered {
	All,
	BestAnswered,
	Answered,
	Unanswered
}

const answeredChoices = [
	// { val: Answered.BestAnswered, key: 'Best Answered' },
	{ val: Answered.All, key: 'All' },
	{ val: Answered.Answered, key: 'Answered' },
	{ val: Answered.Unanswered, key: 'Unanswered' }

]
const global = {
	questions: ref([] as QuestionEntity[]),
	tagId: ref(''),
	answered: ref(answeredChoices[0].val),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => await QuestionsUseCases.listen({
	created: async (entity) => {
		addToArray(global.questions.value, entity, (e) => e.id, (e) => e.createdAt)
	},
	updated: async (entity) => {
		addToArray(global.questions.value, entity, (e) => e.id, (e) => e.createdAt)
	},
	deleted: async (entity) => {
		const index = global.questions.value.findIndex((q) => q.id === entity.id)
		if (index !== -1) global.questions.value.splice(index, 1)
	}
}, global.questions.value.at(-1)?.createdAt))

export const useQuestionList = () => {
	const router = useRouter()
	const fetchQuestions = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const questions = await QuestionsUseCases.get(global.questions.value.at(-1)?.createdAt)
			global.hasMore.value = !!questions.pages.next
			questions.results.forEach((q) => addToArray(global.questions.value, q, (e) => e.id, (e) => e.createdAt))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const filteredQuestions = computed({
		get: () => global.questions.value.filter((q) => {
			if (global.tagId.value && q.tagId !== global.tagId.value) return false
			if (global.answered.value === Answered.Answered && q.answers.length === 0) return false
			if (global.answered.value === Answered.Unanswered && q.answers.length > 0) return false
			if (global.answered.value === Answered.BestAnswered && !q.isAnswered) return false
			return true
		}),
		set: (questions) => {
			questions.map((q) => addToArray(global.questions.value, q, (e) => e.id, (e) => e.createdAt))
		}
	})

	const fetchOlderQuestions = async () => {
		await fetchQuestions()
		await listener.restart()
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchQuestions()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})
	watch(() => global.tagId.value, async () => {
		await router.push('/questions')
	})

	return {
		...global,
		filteredQuestions, answeredChoices,
		fetchOlderQuestions
	}
}

export const useCreateQuestion = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new QuestionFactory()) as Ref<QuestionFactory>
	const router = useRouter()

	const createQuestion = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const question = await QuestionsUseCases.add(factory.value)
				await setMessage('Question submitted successfully')
				factory.value.reset()
				await router.push(`/questions/${question.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, createQuestion }
}

export const useQuestion = (questionId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const question = computed({
		get: () => global.questions.value.find((q) => q.id === questionId) ?? null,
		set: (q) => {
			if (q) addToArray(global.questions.value, q, (e) => e.id, (e) => e.createdAt)
		}
	})

	const fetchQuestion = async () => {
		await setError('')
		try {
			await setLoading(true)
			let question = global.questions.value.find((q) => q.id === questionId) ?? null
			if (question) {
				await setLoading(false)
				return
			}
			question = await QuestionsUseCases.find(questionId)
			if (question) addToArray(global.questions.value, question, (e) => e.id, (e) => e.createdAt)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await QuestionsUseCases.listenToOne(questionId, {
			created: async (entity) => {
				addToArray(global.questions.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global.questions.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				const index = global.questions.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.questions.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		await fetchQuestion()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { error, loading, question }
}

let editingQuestion = null as QuestionEntity | null
export const getEditingQuestion = () => editingQuestion
export const openQuestionEditModal = async (question: QuestionEntity, router: Router) => {
	editingQuestion = question
	await router.push(`/questions/${question.id}/edit`)
}
export const useEditQuestion = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()
	const factory = ref(new QuestionFactory()) as Ref<QuestionFactory>
	if (editingQuestion) factory.value.loadEntity(editingQuestion)

	const editQuestion = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const question = await QuestionsUseCases.update(editingQuestion!.id, factory.value)
				await setMessage('Question updated successfully')
				factory.value.reset()
				await router.push(`/questions/${question.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editQuestion }
}

export const useDeleteQuestion = (questionId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()

	const deleteQuestion = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this question?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await QuestionsUseCases.delete(questionId)
				global.questions.value = global.questions.value
					.filter((q) => q.id !== questionId)
				await setMessage('Question deleted successfully')
				await router.push('/questions')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteQuestion }
}
