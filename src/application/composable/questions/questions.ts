import { useListener } from '@app/composable/core/listener'
import { useUserModal } from '@app/composable/core/modals'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { QuestionEntity, QuestionFactory, QuestionsUseCases } from '@modules/questions'
import { addToArray } from '@utils/commons'
import { Alert } from '@utils/dialog'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { Router, useRouter } from 'vue-router'

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
const store = {
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
		addToArray(store.questions.value, entity, (e) => e.id, (e) => e.createdAt)
	},
	updated: async (entity) => {
		addToArray(store.questions.value, entity, (e) => e.id, (e) => e.createdAt)
	},
	deleted: async (entity) => {
		const index = store.questions.value.findIndex((q) => q.id === entity.id)
		if (index !== -1) store.questions.value.splice(index, 1)
	}
}, store.questions.value.at(-1)?.createdAt))

export const useQuestionList = () => {
	const router = useRouter()
	const fetchQuestions = async () => {
		await store.setError('')
		try {
			await store.setLoading(true)
			const questions = await QuestionsUseCases.get(store.questions.value.at(-1)?.createdAt)
			store.hasMore.value = !!questions.pages.next
			questions.results.forEach((q) => addToArray(store.questions.value, q, (e) => e.id, (e) => e.createdAt))
			store.fetched.value = true
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}
	const filteredQuestions = computed({
		get: () => store.questions.value.filter((q) => {
			if (store.tagId.value && q.tagId !== store.tagId.value) return false
			if (store.answered.value === Answered.Answered && q.answers.length === 0) return false
			if (store.answered.value === Answered.Unanswered && q.answers.length > 0) return false
			if (store.answered.value === Answered.BestAnswered && !q.isAnswered) return false
			return true
		}),
		set: (questions) => {
			questions.map((q) => addToArray(store.questions.value, q, (e) => e.id, (e) => e.createdAt))
		}
	})

	const fetchOlderQuestions = async () => {
		await fetchQuestions()
		await listener.restart()
	}

	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchQuestions()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})
	watch(store.tagId, async () => {
		await router.push('/questions')
	})

	return {
		...store,
		filteredQuestions, answeredChoices,
		fetchOlderQuestions
	}
}

export const useCreateQuestion = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = new QuestionFactory()
	const router = useRouter()

	const createQuestion = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				const question = await QuestionsUseCases.add(factory)
				await setMessage('Question submitted successfully')
				factory.reset()
				await router.push(`/questions/${question.id}`)
				useUserModal().openQuestionCreated()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { error, loading, factory, createQuestion }
}

export const useQuestion = (questionId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const question = computed({
		get: () => store.questions.value.find((q) => q.id === questionId) ?? null,
		set: (q) => {
			if (q) addToArray(store.questions.value, q, (e) => e.id, (e) => e.createdAt)
		}
	})

	const fetchQuestion = async () => {
		await setError('')
		try {
			await setLoading(true)
			let question = store.questions.value.find((q) => q.id === questionId) ?? null
			if (question) {
				await setLoading(false)
				return
			}
			question = await QuestionsUseCases.find(questionId)
			if (question) addToArray(store.questions.value, question, (e) => e.id, (e) => e.createdAt)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await QuestionsUseCases.listenToOne(questionId, {
			created: async (entity) => {
				addToArray(store.questions.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(store.questions.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				const index = store.questions.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) store.questions.value.splice(index, 1)
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
	const factory = new QuestionFactory()
	if (editingQuestion) factory.loadEntity(editingQuestion)

	const editQuestion = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				const question = await QuestionsUseCases.update(editingQuestion!.id, factory)
				await setMessage('Question updated successfully')
				factory.reset()
				await router.push(`/questions/${question.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
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
			message: 'Are you sure you want to delete this question?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await QuestionsUseCases.delete(questionId)
				store.questions.value = store.questions.value
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
