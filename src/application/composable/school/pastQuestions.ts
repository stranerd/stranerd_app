import { reactive, Ref, ref } from 'vue'
import { PastQuestionEntity, PastQuestionFactory, PastQuestionsUseCases, PastQuestionType } from '@modules/school'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useSchoolModal } from '@app/composable/core/modals'
import { addToArray } from '@utils/commons'

const global = {
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
	await global.setError('')
	await global.setLoading(true)
	try {
		const pastQuestions = await PastQuestionsUseCases.getCourseQuestions({
			institutionId: global.filters.institution,
			courseId: global.filters.course,
			year: global.filters.year,
			questionType: global.filters.questionType
		})
		global.pastQuestions.value = pastQuestions.results
		global.fetched.value = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const usePastQuestionList = () => {
	return { ...global, fetchPastQuestions }
}

export const useCreatePastQuestion = () => {
	const factory = ref(new PastQuestionFactory()) as Ref<PastQuestionFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	if (global.filters.institution) factory.value.institutionId = global.filters.institution
	if (global.filters.course) factory.value.courseId = global.filters.course
	if (global.filters.year) factory.value.year = global.filters.year
	if (global.filters.questionType) factory.value.type = global.filters.questionType

	const createPastQuestion = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const pastQuestion = await PastQuestionsUseCases.add(factory.value)
				addToArray(global.pastQuestions.value, pastQuestion, (e) => e.id, (e) => e.createdAt)
				factory.value.reset()
				useSchoolModal().closeCreatePastQuestion()
				await setMessage('PastQuestion created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, createPastQuestion }
}

let editingPastQuestion = null as PastQuestionEntity | null
export const openPastQuestionEditModal = async (pastQuestion: PastQuestionEntity) => {
	editingPastQuestion = pastQuestion
	useSchoolModal().openEditPastQuestion()
}

export const useEditPastQuestion = () => {
	const factory = ref(new PastQuestionFactory()) as Ref<PastQuestionFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingPastQuestion) factory.value.loadEntity(editingPastQuestion)
	else useSchoolModal().closeEditPastQuestion()

	const editPastQuestion = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const updatedPastQuestion = await PastQuestionsUseCases.update(editingPastQuestion!.id, factory.value)
				addToArray(global.pastQuestions.value, updatedPastQuestion, (e) => e.id, (e) => e.createdAt)
				factory.value.reset()
				useSchoolModal().closeEditPastQuestion()
				await setMessage('PastQuestion updated successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
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
				global.pastQuestions.value = global.pastQuestions.value
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
