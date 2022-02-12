import { reactive, Ref, ref } from 'vue'
import {
	AddPastQuestion,
	DeletePastQuestion,
	EditPastQuestion,
	FindPastQuestion,
	GetPastQuestions,
	PastQuestionEntity,
	PastQuestionFactory,
	PastQuestionType
} from '@modules/study'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useStudyModal } from '@app/composable/core/modals'

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

const pushToGlobalPastQuestions = (pastQuestion: PastQuestionEntity) => {
	const index = global.pastQuestions.value.findIndex((s) => s.id === pastQuestion.id)
	if (index !== -1) global.pastQuestions.value.splice(index, 1, pastQuestion)
	else global.pastQuestions.value.push(pastQuestion)
}

const fetchPastQuestions = async () => {
	await global.setError('')
	await global.setLoading(true)
	try {
		global.pastQuestions.value = (await GetPastQuestions.call({
			institutionId: global.filters.institution,
			courseId: global.filters.course,
			year: global.filters.year,
			questionType: global.filters.questionType
		})).results
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
				const id = await AddPastQuestion.call(factory.value)
				const pastQuestion = await FindPastQuestion.call(id)
				if (pastQuestion) pushToGlobalPastQuestions(pastQuestion)
				factory.value.reset()
				useStudyModal().closeCreatePastQuestion()
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
export const getEditingPastQuestion = () => editingPastQuestion
export const openPastQuestionEditModal = async (pastQuestion: PastQuestionEntity) => {
	editingPastQuestion = pastQuestion
	useStudyModal().openEditPastQuestion()
}

export const useEditPastQuestion = () => {
	const factory = ref(new PastQuestionFactory()) as Ref<PastQuestionFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingPastQuestion) factory.value.loadEntity(editingPastQuestion)
	else useStudyModal().closeEditPastQuestion()

	const editPastQuestion = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				await EditPastQuestion.call(editingPastQuestion!.id, factory.value)
				const updatedPastQuestion = await FindPastQuestion.call(editingPastQuestion!.id)
				if (updatedPastQuestion) pushToGlobalPastQuestions(updatedPastQuestion)
				factory.value.reset()
				useStudyModal().closeEditPastQuestion()
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
			title: 'Are you sure you want to delete this pastQuestion?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeletePastQuestion.call(pastQuestion.id)
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
