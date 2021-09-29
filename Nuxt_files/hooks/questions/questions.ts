import { computed, ref, Ref, ssrRef, useFetch, useRouter } from '@nuxtjs/composition-api'
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
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { COINS_GAP, MAXIMUM_COINS, MINIMUM_COINS } from '@utils/constants'
import { useAuth } from '@app/hooks/auth/auth'
import { analytics } from '@modules/core'
import VueRouter from 'vue-router'
import { Alert } from '@app/hooks/core/notifications'
import { useQuestionsModal } from '@app/hooks/core/modals'

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
const global = {
	questions: ssrRef([] as QuestionEntity[]),
	subjectId: ssrRef(''),
	answered: ssrRef(answeredChoices[0].val),
	fetched: ssrRef(false),
	hasMore: ssrRef(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

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
	const filteredQuestions = computed({
		get: () => global.questions.value.filter((q) => {
			if (global.subjectId.value && q.subjectId !== global.subjectId.value) return false
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

	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchQuestions()
	})

	return {
		...global, listener,
		filteredQuestions, answeredChoices,
		fetchOlderQuestions
	}
}

const factory = ref(new QuestionFactory()) as Ref<QuestionFactory>
export const useCreateQuestion = () => {
	const { user, isLoggedIn } = useAuth()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()
	const coins = computed({
		get: () => {
			if (!isLoggedIn) {
				setError('Login to continue').then()
				return []
			}
			if (user.value!.account.coins.bronze < MINIMUM_COINS) {
				setError(`You need at least ${MINIMUM_COINS} coins to ask a question`).then()
				return []
			}
			const coins = [] as number[]
			const maximum = user.value!.account.coins.bronze <= MAXIMUM_COINS ? user.value!.account.coins.bronze : MAXIMUM_COINS
			for (let i = MINIMUM_COINS; i <= maximum; i = i + COINS_GAP) coins.push(i)
			return coins
		}, set: () => {
		}
	})

	const createQuestion = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const questionId = await AddQuestion.call(factory.value)
				await setMessage('Question submitted successfully')
				const subject = factory.value.subjectId
				factory.value.reset()
				await router.replace(`/questions/${questionId}`)
				analytics.logEvent('ask_question_completed', {
					questionId, subject
				})
				useQuestionsModal().closeAskQuestions()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, coins, createQuestion }
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

	useFetch(fetchQuestion)

	return { error, loading, question, listener }
}

let editingQuestion = null as QuestionEntity | null
export const getEditingQuestion = () => editingQuestion
export const openQuestionEditModal = (question: QuestionEntity, router: VueRouter) => {
	editingQuestion = question
	router.push(`/questions/${question.id}/edit`)
}
export const useEditQuestion = (questionId: string) => {
	const { user, isLoggedIn } = useAuth()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()
	const factory = ref(new QuestionFactory()) as Ref<QuestionFactory>
	const coins = computed({
		get: () => {
			if (!isLoggedIn) {
				setError('Login to continue').then()
				return []
			}
			if (user.value!.account.coins.bronze < MINIMUM_COINS) {
				setError(`You need at least ${MINIMUM_COINS} coins to ask a question`).then()
				return []
			}
			const coins = [] as number[]
			const maximum = user.value!.account.coins.bronze <= MAXIMUM_COINS ? user.value!.account.coins.bronze : MAXIMUM_COINS
			for (let i = MINIMUM_COINS; i <= maximum; i = i + COINS_GAP) coins.push(i)
			return coins
		}, set: () => {
		}
	})

	if (editingQuestion) factory.value.loadEntity(editingQuestion)

	const editQuestion = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await EditQuestion.call(questionId, factory.value)
				await setMessage('Question edited successfully')
				const subject = factory.value.subjectId
				factory.value.reset()
				await router.replace(`/questions/${questionId}`)
				analytics.logEvent('edit_question_completed', {
					questionId, subject
				})
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, coins, editQuestion }
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
			text: 'This cannot be reversed',
			icon: 'warning',
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
