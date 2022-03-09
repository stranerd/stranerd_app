import { onMounted, onUnmounted, ref, Ref } from 'vue'
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
} from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { Alert } from '@utils/dialog'
import { Router, useRouter } from 'vue-router'

const global = {} as Record<string, {
	answers: Ref<AnswerEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useAnswerList = (questionId: string) => {
	if (global[questionId] === undefined) {
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
		global[questionId] = {
			answers: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
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

	onMounted(async () => {
		if (!global[questionId].fetched.value && !global[questionId].loading.value) await fetchAnswers()
		await global[questionId].listener.startListener()
	})
	onUnmounted(async () => {
		await global[questionId].listener.closeListener()
	})

	return {
		error: global[questionId].error,
		loading: global[questionId].loading,
		answers: global[questionId].answers
	}
}

let answeringQuestion = null as QuestionEntity | null
export const showAddAnswer = ref(false)
export const openAnswerModal = (question: QuestionEntity) => {
	answeringQuestion = question
	showAddAnswer.value = true
}

export const useCreateAnswer = () => {
	const router = useRouter()
	const factory = ref(new AnswerFactory()) as Ref<AnswerFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	if (!answeringQuestion) router.push('/questions')
	factory.value.questionId = answeringQuestion!.id

	const createAnswer = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AddAnswer.call(factory.value)
				await setMessage('Answer submitted successfully.')
				factory.value.reset()
				await router.push(`/questions/${answeringQuestion?.id ?? ''}`)
				showAddAnswer.value = false
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
			await VoteAnswer.call(answer.id, vote)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}

	const markBestAnswer = async (question: QuestionEntity) => {
		if (question.isAnswered || question.userId !== id.value || answer.best) return
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to mark this answer as the best',
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

let editingQuestionAnswer = null as { answer: AnswerEntity, question: QuestionEntity } | null
export const getEditingAnswer = () => editingQuestionAnswer
export const openAnswerEditModal = (data: { question: QuestionEntity, answer: AnswerEntity }, router: Router) => {
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
				await router.push(`/questions/${editingQuestionAnswer?.question.id}`)
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
