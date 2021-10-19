import { Ref, ref, onMounted  } from 'vue'
import {
	AddAnswer,
	AnswerEntity,
	AnswerFactory,
	DeleteAnswer,
	EditAnswer,
	GetAnswers,
	ListenToAnswers,
	MarkBestAnswer,
	QuestionEntity,
	VoteAnswer
} from '@/modules/questions'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@/application/composable/core/states'
import { useAuth } from '@/application/composable/auth/auth'
import { Alert } from '@/application/composable/core/notifications'
import { analytics } from '@/modules/core'
import VueRouter, { useRouter } from 'vue-router'

const global = {} as Record<string, {
	answers: Ref<AnswerEntity[]>;
	fetched: Ref<boolean>;
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useAnswerList = (questionId: string) => {
	if (global[questionId] === undefined) global[questionId] = {
		answers: ref([]),
		fetched: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchAnswers = async () => {
		await global[questionId].setError('')
		try {
			await global[questionId].setLoading(true)
			global[questionId].answers.value = (await GetAnswers.call(questionId)).results
			global[questionId].fetched.value = true
		} catch (error) {
			await global[questionId].setError(error)
		}
		await global[questionId].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToAnswers.call(questionId, {
			created: async (entity) => {
				const index = global[questionId].answers.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[questionId].answers.value.push(entity)
				else global[questionId].answers.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = global[questionId].answers.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[questionId].answers.value.push(entity)
				else global[questionId].answers.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				global[questionId].answers.value = global[questionId].answers.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[questionId].fetched.value && !global[questionId].loading.value) await fetchAnswers()
	})

	return {
		error: global[questionId].error,
		loading: global[questionId].loading,
		answers: global[questionId].answers,
		listener
	}
}

let answeringQuestion = null as QuestionEntity | null
export const getAnsweringQuestion = () => answeringQuestion
export const openAnswerModal = (question: QuestionEntity) => {
	const router = useRouter()
	answeringQuestion = question
	router.push(`/questions/${question.id}/answers/create`)
}

export const useCreateAnswer = () => {
	const router = useRouter()
	const factory = ref(new AnswerFactory()) as Ref<AnswerFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	if (!answeringQuestion) router.replace('/questions')
	factory.value.questionId = answeringQuestion!.id

	const createAnswer = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const answerId = await AddAnswer.call(factory.value)
				await setMessage('Answer submitted successfully.')
				factory.value.reset()
				await router.replace(`/questions/${answeringQuestion?.id ?? ''}/#${answerId}`)
				await analytics.logEvent('answer_question_completed', {
					questionId: answeringQuestion?.id,
					answerId,
					subject: answeringQuestion?.subjectId
				})
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, answeringQuestion,
		createAnswer
	}
}

export const useAnswer = (answer: AnswerEntity) => {
	const { id } = useAuth()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const voteAnswer = async (vote: boolean) => {
		const userId = useAuth().id.value
		if (!userId) return
		const voted = answer.votes.find((v) => v.userId === userId)
		if (vote && voted?.vote === 1) return
		if (!vote && voted?.vote === -1) return
		await setError('')
		try {
			await setLoading(true)
			await VoteAnswer.call(answer.id, userId, vote)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}

	const markBestAnswer = async (question: QuestionEntity | null) => {
		if (!question || question.isAnswered) return
		if (question.userId !== id.value) return
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to mark this answer as the best',
			text: 'This cannot be reversed',
			icon: 'info',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			try {
				await setLoading(true)
				await MarkBestAnswer.call(question.id, answer.id)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return {
		loading, error, markBestAnswer, voteAnswer
	}
}

let editingQuestionAnswer = null as { answer: AnswerEntity; question: QuestionEntity } | null
export const getEditingAnswer = () => editingQuestionAnswer
export const openAnswerEditModal = (data: { question: QuestionEntity; answer: AnswerEntity }) => {
	const router = useRouter()
	editingQuestionAnswer = data
	router.push(`/questions/${data.question.id}/answers/${data.answer.id}/edit`)
}
export const useEditAnswer = (answerId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new AnswerFactory()) as Ref<AnswerFactory>
	const router = useRouter()

	if (editingQuestionAnswer) factory.value.loadEntity(editingQuestionAnswer.answer)

	const editAnswer = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await EditAnswer.call(answerId, factory.value)
				await setMessage('Answer edited successfully')
				factory.value.reset()
				await router.replace(`/questions/${editingQuestionAnswer?.question.id}#${answerId}`)
				await analytics.logEvent('edit_answer_completed', {
					questionId: editingQuestionAnswer?.answer.questionId,
					answerId,
					subject: editingQuestionAnswer?.question.subjectId
				})
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editAnswer }
}

export const useDeleteAnswer = (answerId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteAnswer = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this answer?',
			text: 'This cannot be reversed',
			icon: 'warning',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteAnswer.call(answerId)
				await setMessage('Answer deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteAnswer }
}
