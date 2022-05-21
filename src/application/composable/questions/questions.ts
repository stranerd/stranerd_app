import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import { QuestionEntity, QuestionFactory, QuestionsUseCases, QuestionType } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useQuestionModal } from '@app/composable/core/modals'
import { ClassEntity } from '@modules/classes'
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
	subject: ref(''),
	answered: ref(answeredChoices[0].val),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	const lastDate = global.questions.value[global.questions.value.length - 1]?.createdAt
	return await QuestionsUseCases.listen({
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
	}, lastDate ? lastDate - 1 : undefined)
})

export const useQuestionList = () => {
	const fetchQuestions = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const lastDate = global.questions.value[global.questions.value.length - 1]?.createdAt
			const questions = await QuestionsUseCases.get(lastDate)
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
			if (global.subject.value && q.subject !== global.subject.value) return false
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

	return {
		...global,
		filteredQuestions, answeredChoices,
		fetchOlderQuestions
	}
}

let questionClass = null as ClassEntity | null
export const getQuestionClass = () => questionClass
export const openQuestionModalFromClass = async (classInst: ClassEntity, router: Router) => {
	questionClass = classInst
	await router.push('/questions/create')
}

export const useCreateQuestion = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new QuestionFactory()) as Ref<QuestionFactory>
	const router = useRouter()
	if (questionClass) {
		factory.value.type = QuestionType.classes
		factory.value.classId = questionClass.id
		questionClass = null
	}

	const createQuestion = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const question = await QuestionsUseCases.add(factory.value)
				await setMessage('Question submitted successfully')
				factory.value.reset()
				useQuestionModal().closeCreateQuestion()
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
				useQuestionModal().closeEditQuestion()
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
