import { computed, ComputedRef, onMounted, onUnmounted, reactive, Ref, ref, watch } from 'vue'
import { TestPrepEntity, TestPrepFactory, TestPrepsUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
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
	searchMode: ref(false),
	searchValue: ref(''),
	searchResults: ref([] as TestPrepEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}
const saved = {
	testPreps: ref([] as TestPrepEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	return await TestPrepsUseCases.listen({
		created: async (entity) => {
			addToArray(global.testPreps.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		updated: async (entity) => {
			addToArray(global.testPreps.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		deleted: async (entity) => {
			const index = global.testPreps.value.findIndex((q) => q.id === entity.id)
			if (index !== -1) global.testPreps.value.splice(index, 1)
		}
	})
})

const fetchTestPreps = async () => {
	await global.setError('')
	try {
		await global.setLoading(true)
		const testPreps = await TestPrepsUseCases.get()
		testPreps.results.forEach((t) => addToArray(global.testPreps.value, t, (e) => e.id, (e) => e.createdAt))
		global.fetched.value = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useTestPrepList = () => {
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTestPreps()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	const search = async () => {
		const searchValue = global.searchValue.value
		if (!searchValue) return
		global.searchMode.value = true
		await global.setError('')
		try {
			await global.setLoading(true)
			global.searchResults.value = await TestPrepsUseCases.searchWithFilters(searchValue, global.filters)
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	watch(global.searchValue, () => {
		if (!global.searchValue.value) global.searchMode.value = false
	})

	return { ...global, search }
}

export const useSavedTestPreps = (list: ComputedRef<string[]>) => {
	const fetchPreps = async () => {
		try {
			const testPreps = await TestPrepsUseCases.getInList(list.value)
			saved.testPreps.value = testPreps.results
			saved.fetched.value = true
		} catch (error) {
			await saved.setError(error)
		}
		await saved.setLoading(false)
	}

	onMounted(async () => {
		if (!saved.fetched.value && !saved.loading.value) await fetchPreps()
	})
	watch(list, fetchPreps, { deep: true })

	return { ...saved, fetchPreps }
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
			title: 'Are you sure you want to delete this testPrep?',
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
