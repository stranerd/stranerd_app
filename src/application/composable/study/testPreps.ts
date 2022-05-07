import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import { TestPrepEntity, TestPrepFactory, TestPrepsUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray, groupBy } from '@utils/commons'
import { useStudyModal } from '@app/composable/core/modals'

export type InstitutionTestPreps = {
	institutionId: string,
	preps: TestPrepEntity[]
}

const global = {
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
	return { ...global }
}

export const groupedByInstitution = (testPreps: TestPrepEntity[]) => computed({
	get: () => groupBy(testPreps, (prep) => prep.data.institutionId)
		.map(({ key, values }) => ({ institutionId: key, preps: values })),
	set: () => {
	}
})

export const useTestPrep = (id: string) => {
	const testPrep = computed({
		get: () => global.testPreps.value.find((s) => s.id === id) ?? null,
		set: (s) => {
			if (s) addToArray(global.testPreps.value, s, (e) => e.id, (e) => e.createdAt)
		}
	})
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTestPreps()
	})

	return { testPrep }
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
				await TestPrepsUseCases.add(factory.value)
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
				await TestPrepsUseCases.update(editingTestPrep!.id, factory.value)
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
