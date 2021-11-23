import { onMounted, Ref, ref } from 'vue'
import {
	AddTestPrep,
	DeleteTestPrep,
	EditTestPrep,
	GetTestPreps,
	ListenToTestPreps,
	TestPrepEntity,
	TestPrepFactory
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@app/composable/core/notifications'

const global = {
	testPreps: ref([] as TestPrepEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToTestPrepList = (testPrep: TestPrepEntity) => {
	const index = global.testPreps.value.findIndex((q) => q.id === testPrep.id)
	if (index !== -1) global.testPreps.value.splice(index, 1, testPrep)
	else global.testPreps.value.push(testPrep)
}
const unshiftToTestPrepList = (testPrep: TestPrepEntity) => {
	const index = global.testPreps.value.findIndex((q) => q.id === testPrep.id)
	if (index !== -1) global.testPreps.value.splice(index, 1, testPrep)
	else global.testPreps.value.unshift(testPrep)
}

export const useTestPrepList = () => {
	const fetchTestPreps = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const testPreps = await GetTestPreps.call()
			global.hasMore.value = !!testPreps.pages.next
			testPreps.results.forEach(pushToTestPrepList)
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const listener = useListener(async () => {
		const lastDate = global.testPreps.value[global.testPreps.value.length - 1]?.createdAt
		return await ListenToTestPreps.call({
			created: async (entity) => {
				unshiftToTestPrepList(entity)
			},
			updated: async (entity) => {
				unshiftToTestPrepList(entity)
			},
			deleted: async (entity) => {
				const index = global.testPreps.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.testPreps.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTestPreps()
	})

	return {
		...global, listener,
		fetchOlderTestPreps: fetchTestPreps
	}
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
				await AddTestPrep.call(factory.value)
				await setMessage('TestPrep submitted successfully')
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
}
export const useEditTestPrep = (testPrepId: string) => {
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
				await EditTestPrep.call(testPrepId, factory.value)
				await setMessage('TestPrep edited successfully')
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
			text: 'This cannot be reversed',
			icon: 'warning',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteTestPrep.call(testPrepId)
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