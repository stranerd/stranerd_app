import { useStudyModal } from '@app/composable/core/modals'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { PastQuestionType } from '@modules/school'
import { TestPrepEntity, TestPrepFactory, TestPrepsUseCases } from '@modules/study'
import { addToArray } from '@utils/commons'
import { Alert } from '@utils/dialog'
import { computed, onMounted, reactive, ref } from 'vue'

const store = {
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
	await store.setError('')
	try {
		await store.setLoading(true)
		const testPreps = await TestPrepsUseCases.get()
		testPreps.results.forEach((t) => addToArray(store.testPreps.value, t, (e) => e.id, (e) => e.data.year))
		store.fetched.value = true
	} catch (error) {
		await store.setError(error)
	}
	await store.setLoading(false)
}

export const useTestPrepList = () => {
	const fetchCoursePreps = async (courseId: string) => {
		if (store.courses[courseId]) return
		await store.setError('')
		try {
			await store.setLoading(true)
			const testPreps = await TestPrepsUseCases.getCoursePreps(courseId)
			testPreps.results.forEach((t) => addToArray(store.testPreps.value, t, (e) => e.id, (e) => e.data.year))
			store.courses[courseId] = true
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}

	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchTestPreps()
	})

	return { ...store, fetchCoursePreps }
}

export const useTestPrep = (id: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const testPrep = computed({
		get: () => store.testPreps.value.find((s) => s.id === id) ?? null,
		set: (s) => {
			if (s) addToArray(store.testPreps.value, s, (e) => e.id, (e) => e.createdAt)
		}
	})

	const findTestPrep = async () => {
		await setError('')
		try {
			await setLoading(true)
			const prep = store.testPreps.value.find((t) => t.id === id) ?? null
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
	const factory = new TestPrepFactory()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const createTestPrep = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				const testPrep = await TestPrepsUseCases.add(factory)
				addToArray(store.testPreps.value, testPrep, (e) => e.id, (e) => e.createdAt)
				await setMessage('TestPrep submitted successfully')
				useStudyModal().closeCreateTestPrep()
				factory.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
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
	const factory = new TestPrepFactory()
	if (editingTestPrep) factory.loadEntity(editingTestPrep)

	const editTestPrep = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				const testPrep = await TestPrepsUseCases.update(editingTestPrep!.id, factory)
				addToArray(store.testPreps.value, testPrep, (e) => e.id, (e) => e.createdAt)
				await setMessage('TestPrep updated successfully')
				useStudyModal().closeEditTestPrep()
				factory.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
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
				store.testPreps.value = store.testPreps.value
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
