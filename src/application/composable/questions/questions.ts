import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import {
	AddQuestion,
	DeleteQuestion,
	EditQuestion,
	FindQuestion,
	GetQuestions,
	ListenToQuestion,
	ListenToQuestions,
	QuestionEntity,
	QuestionFactory
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useQuestionModal } from '@app/composable/core/modals'

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
	return await ListenToQuestions.call({
		created: async (entity) => {
			unshiftToQuestionList(entity)
		},
		updated: async (entity) => {
			unshiftToQuestionList(entity)
		},
		deleted: async (entity) => {
			const index = global.questions.value.findIndex((q) => q.id === entity.id)
			if (index !== -1) global.questions.value.splice(index, 1)
		}
	}, lastDate ? lastDate - 1 : undefined)
})

const pushToQuestionList = (question: QuestionEntity) => {
	const index = global.questions.value.findIndex((q) => q.id === question.id)
	if (index !== -1) global.questions.value.splice(index, 1, question)
	else global.questions.value.push(question)
}
const unshiftToQuestionList = (question: QuestionEntity) => {
	const index = global.questions.value.findIndex((q) => q.id === question.id)
	if (index !== -1) global.questions.value.splice(index, 1, question)
	else global.questions.value.unshift(question)
}

export const useQuestionList = () => {
	const fetchQuestions = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const lastDate = global.questions.value[global.questions.value.length - 1]?.createdAt
			const questions = await GetQuestions.call(lastDate)
			global.hasMore.value = !!questions.pages.next
			questions.results.forEach(pushToQuestionList)
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
		}).sort((a, b) => {
			return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
		}), set: (questions) => {
			questions.map(pushToQuestionList)
		}
	})

	const fetchOlderQuestions = async () => {
		await fetchQuestions()
		await listener.resetListener(async () => {
			const lastDate = global.questions.value[global.questions.value.length - 1]?.createdAt
			return await ListenToQuestions.call({
				created: async (entity) => {
					unshiftToQuestionList(entity)
				},
				updated: async (entity) => {
					unshiftToQuestionList(entity)
				},
				deleted: async (entity) => {
					const index = global.questions.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) global.questions.value.splice(index, 1)
				}
			}, lastDate ? lastDate - 1 : undefined)
		})
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchQuestions()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return {
		...global,
		filteredQuestions, answeredChoices,
		fetchOlderQuestions
	}
}

const factory = ref(new QuestionFactory()) as Ref<QuestionFactory>
export const useCreateQuestion = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()

	const createQuestion = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const questionId = await AddQuestion.call(factory.value)
				await setMessage('Question submitted successfully')
				factory.value.reset()
				useQuestionModal().closeCreateQuestion()
				await router.replace(`/questions/${questionId}`)
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
			if (q) pushToQuestionList(q)
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
			question = await FindQuestion.call(questionId)
			if (question) unshiftToQuestionList(question)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await ListenToQuestion.call(questionId, {
			created: async (entity) => {
				unshiftToQuestionList(entity)
			},
			updated: async (entity) => {
				unshiftToQuestionList(entity)
			},
			deleted: async (entity) => {
				const index = global.questions.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.questions.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		await fetchQuestion()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
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
				await EditQuestion.call(editingQuestion!.id, factory.value)
				await setMessage('Question edited successfully')
				useQuestionModal().closeEditQuestion()
				factory.value.reset()
				await router.replace(`/questions/${editingQuestion!.id}`)
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
				await DeleteQuestion.call(questionId)
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
