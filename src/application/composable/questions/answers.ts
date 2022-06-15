import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { AnswerEntity, AnswerFactory, AnswersUseCases, QuestionEntity, QuestionsUseCases } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { Alert } from '@utils/dialog'
import { Router, useRouter } from 'vue-router'
import { addToArray } from '@utils/commons'
import { InteractionEntities, LikeEntity, LikesUseCases } from '@modules/interactions'

const global = {} as Record<string, {
	answers: Ref<AnswerEntity[]>
	fetched: Ref<boolean>
	likes: Ref<Record<string, LikeEntity>>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const answerGlobal = {} as Record<string, {
	answer: Ref<AnswerEntity | null>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const getLikesOfAnswers = async (userId: string, questionId: string, answerIds: string[]) => {
	const { results: likes } = await LikesUseCases.getInList(userId, answerIds, InteractionEntities.answers)
	likes.forEach((like) => {
		global[questionId].likes.value[like.entity.id] = like
	})
}

export const useAnswerList = (questionId: string) => {
	const { id } = useAuth()
	if (global[questionId] === undefined) {
		const listener = useListener(async () => {
			return await AnswersUseCases.listenToQuestionAnswers(questionId, {
				created: async (entity) => {
					addToArray(global[questionId].answers.value, entity, (e) => e.id, (e) => e.createdAt, true)
				},
				updated: async (entity) => {
					addToArray(global[questionId].answers.value, entity, (e) => e.id, (e) => e.createdAt, true)
				},
				deleted: async (entity) => {
					global[questionId].answers.value = global[questionId].answers.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		global[questionId] = {
			answers: ref([]),
			likes: ref({}),
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
			const answers = await AnswersUseCases.getQuestionAnswers(questionId)
			answers.results.forEach((a) => addToArray(global[questionId].answers.value, a, (e) => e.id, (e) => e.createdAt, true))
			await getLikesOfAnswers(id.value, questionId, answers.results.map((a) => a.id))
			global[questionId].fetched.value = true
		} catch (error) {
			await global[questionId].setError(error)
		}
		await global[questionId].setLoading(false)
	}

	onMounted(async () => {
		if (!global[questionId].fetched.value && !global[questionId].loading.value) await fetchAnswers()
		await global[questionId].listener.start()
	})
	onUnmounted(async () => {
		await global[questionId].listener.close()
	})

	return {
		error: global[questionId].error,
		loading: global[questionId].loading,
		answers: global[questionId].answers,
		likes: global[questionId].likes
	}
}

let answeringQuestion = null as QuestionEntity | null
export const getAnsweringQuestion = () => answeringQuestion
export const openAnswerModal = async (question: QuestionEntity, router: Router) => {
	answeringQuestion = question
	await router.push(`/questions/${question.id}/answers/create`)
}

export const useCreateAnswer = () => {
	const router = useRouter()
	const factory = ref(new AnswerFactory()) as Ref<AnswerFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	if (!answeringQuestion) router.push('/questions')
	else factory.value.questionId = answeringQuestion!.id

	const createAnswer = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const answer = await AnswersUseCases.add(factory.value)
				await setMessage('Answer submitted successfully.')
				factory.value.reset()
				await router.push(`/questions/${answer.questionId}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, answeringQuestion: answeringQuestion!,
		createAnswer
	}
}

export const useAnswer = (answer: AnswerEntity) => {
	const { id } = useAuth()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const likeAnswer = async (value: boolean) => {
		const userId = useAuth().id.value
		if (!userId) return
		const liked = global[answer.questionId].likes.value[answer.id]
		if (liked && liked.value === value) return
		await setError('')
		try {
			await setLoading(true)
			const like = await LikesUseCases.add({ id: answer.id, type: InteractionEntities.answers }, value)
			global[answer.questionId].likes.value[like.entity.id] = like
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}

	const markBestAnswer = async (question: QuestionEntity) => {
		if (question.isAnswered || question.user.id !== id.value || answer.best) return
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to mark this answer as the best',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			try {
				await setLoading(true)
				await QuestionsUseCases.markBestAnswer(question.id, answer.id)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return {
		loading, error, markBestAnswer, likeAnswer
	}
}

export const useAnswerById = (answerId: string) => {
	const fetchAnswer = async () => {
		await answerGlobal[answerId].setError('')
		try {
			await answerGlobal[answerId].setLoading(true)
			answerGlobal[answerId].answer.value = await AnswersUseCases.find(answerId)
		} catch (error) {
			await answerGlobal[answerId].setError(error)
		}
		await answerGlobal[answerId].setLoading(false)
	}

	if (answerGlobal[answerId] === undefined) {
		const listener = useListener(async () => {
			const setAnswer = async (entity: AnswerEntity) => {
				answerGlobal[answerId].answer.value = entity
			}
			return await AnswersUseCases.listenToOne(answerId, {
				created: setAnswer,
				updated: setAnswer,
				deleted: setAnswer
			})
		})
		answerGlobal[answerId] = {
			answer: ref(null),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	onMounted(async () => {
		if (!answerGlobal[answerId].fetched.value && !answerGlobal[answerId].loading.value) await fetchAnswer()
		await answerGlobal[answerId].listener.start()
	})
	onUnmounted(async () => {
		await answerGlobal[answerId].listener.close()
	})

	return { ...answerGlobal[answerId] }
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
				const answer = await AnswersUseCases.update(answerId, factory.value)
				await setMessage('Answer updated successfully')
				factory.value.reset()
				await router.push(`/questions/${answer.questionId}`)
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
				await AnswersUseCases.delete(answerId)
				await setMessage('Answer deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteAnswer }
}
