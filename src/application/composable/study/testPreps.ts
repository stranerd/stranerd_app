import { computed, onMounted, reactive, Ref, ref } from 'vue'
import { TestPrepEntity, TestPrepFactory, TestPrepsUseCases } from '@modules/study'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { useStudyModal } from '@app/composable/core/modals'
import { PastQuestionType } from '@modules/school'

const global = {
	filters: reactive({
		institutionId: null as string | null,
		courseId: null as string | null,
		year: null as number | null,
		questionTypes: [] as PastQuestionType[]
	}),
	testPreps: ref([] as TestPrepEntity[]),
	fetched: ref(false),
	courses: {} as Record<string, boolean>,
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchTestPreps = async () => {
	await global.setError('')
	try {
		await global.setLoading(true)
		const testPreps = await TestPrepsUseCases.get()
		testPreps.results.forEach((t) => addToArray(global.testPreps.value, t, (e) => e.id, (e) => e.data.year))
		global.fetched.value = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useTestPrepList = () => {
	const fetchCoursePreps = async (courseId: string) => {
		if (global.courses[courseId]) return
		await global.setError('')
		try {
			await global.setLoading(true)
			const testPreps = await TestPrepsUseCases.getCoursePreps(courseId)
			testPreps.results.forEach((t) => addToArray(global.testPreps.value, t, (e) => e.id, (e) => e.data.year))
			global.courses[courseId] = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTestPreps()
	})

	return { ...global, fetchCoursePreps }
}

export const useTestPrep = (id: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const testPrep = computed({
		get: () => global.testPreps.value.find((s) => s.id === id) ?? null,
		set: (s) => {
			if (s) addToArray(global.testPreps.value, s, (e) => e.id, (e) => e.createdAt)
		}
	})

	const findTestPrep = async () => {
		await setError('')
		try {
			await setLoading(true)
			const prep = global.testPreps.value.find((t) => t.id === id) ?? null
			if (!prep) testPrep.value = await TestPrepsUseCases.find(id)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}

	onMounted(async () => {
		await findTestPrep()
	})

	return { testPrep, loading, error }
}

export const useCreateTestPrep = () => {
	const factory = ref(new TestPrepFactory()) as Ref<TestPrepFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const createTestPrep = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const testPrep = await TestPrepsUseCases.add(factory.value)
				addToArray(global.testPreps.value, testPrep, (e) => e.id, (e) => e.createdAt)
				await setMessage('TestPrep submitted successfully')
				useStudyModal().closeCreateTestPrep()
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, createTestPrep }
}

let editingTestPrep = null as TestPrepEntity | null
export const getEditingTestPrep = () => editingTestPrep
export const openTestPrepEditModal = (testPrep: TestPrepEntity) => {
	editingTestPrep = testPrep
	useStudyModal().openEditTestPrep()
}
export const useEditTestPrep = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new TestPrepFactory()) as Ref<TestPrepFactory>
	if (editingTestPrep) factory.value.loadEntity(editingTestPrep)

	const editTestPrep = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const testPrep = await TestPrepsUseCases.update(editingTestPrep!.id, factory.value)
				addToArray(global.testPreps.value, testPrep, (e) => e.id, (e) => e.createdAt)
				await setMessage('TestPrep updated successfully')
				useStudyModal().closeEditTestPrep()
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editTestPrep }
}

export const useDeleteTestPrep = (testPrepId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteTestPrep = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to delete this testPrep?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await TestPrepsUseCases.delete(testPrepId)
				global.testPreps.value = global.testPreps.value
					.filter((q) => q.id !== testPrepId)
				await setMessage('TestPrep deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteTestPrep }
}
