import { useSchoolModal } from '@app/composable/core/modals'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { PastQuestionEntity, PastQuestionFactory, PastQuestionsUseCases, PastQuestionType } from '@modules/school'
import { addToArray } from '@utils/commons'
import { Alert } from '@utils/dialog'
import { reactive, ref } from 'vue'

const store = {
	fetched: ref(false),
	filters: reactive({
		institution: null as string | null,
		course: null as string | null,
		year: null as number | null,
		questionType: null as PastQuestionType | null
	}),
	pastQuestions: ref([] as PastQuestionEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchPastQuestions = async () => {
	await store.setError('')
	await store.setLoading(true)
	try {
		const pastQuestions = await PastQuestionsUseCases.getCourseQuestions({
			institutionId: store.filters.institution,
			courseId: store.filters.course,
			year: store.filters.year,
			questionType: store.filters.questionType
		})
		store.pastQuestions.value = pastQuestions.results
		store.fetched.value = true
	} catch (error) {
		await store.setError(error)
	}
	await store.setLoading(false)
}

export const usePastQuestionList = () => {
	return { ...store, fetchPastQuestions }
}

export const useCreatePastQuestion = () => {
	const factory = new PastQuestionFactory()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	if (store.filters.institution) factory.institutionId = store.filters.institution
	if (store.filters.course) factory.courseId = store.filters.course
	if (store.filters.year) factory.year = store.filters.year
	if (store.filters.questionType) factory.type = store.filters.questionType

	const createPastQuestion = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			await setLoading(true)
			try {
				const pastQuestion = await PastQuestionsUseCases.add(factory)
				addToArray(store.pastQuestions.value, pastQuestion, (e) => e.id, (e) => e.createdAt)
				factory.reset()
				useSchoolModal().closeCreatePastQuestion()
				await setMessage('PastQuestion created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { factory, loading, error, createPastQuestion }
}

let editingPastQuestion = null as PastQuestionEntity | null
export const openPastQuestionEditModal = async (pastQuestion: PastQuestionEntity) => {
	editingPastQuestion = pastQuestion
	useSchoolModal().openEditPastQuestion()
}

export const useEditPastQuestion = () => {
	const factory = new PastQuestionFactory()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingPastQuestion) factory.loadEntity(editingPastQuestion)
	else useSchoolModal().closeEditPastQuestion()

	const editPastQuestion = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			await setLoading(true)
			try {
				const updatedPastQuestion = await PastQuestionsUseCases.update(editingPastQuestion!.id, factory)
				addToArray(store.pastQuestions.value, updatedPastQuestion, (e) => e.id, (e) => e.createdAt)
				factory.reset()
				useSchoolModal().closeEditPastQuestion()
				await setMessage('PastQuestion updated successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { factory, loading, error, editPastQuestion }
}

export const useDeletePastQuestion = (pastQuestion: PastQuestionEntity) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deletePastQuestion = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to delete this pastQuestion?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await PastQuestionsUseCases.delete(pastQuestion.id)
				store.pastQuestions.value = store.pastQuestions.value
					.filter((s) => s.id !== pastQuestion.id)
				await setMessage('PastQuestion deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deletePastQuestion }
}
