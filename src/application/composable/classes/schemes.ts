import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { ClassEntity, SchemeEntity, SchemeFactory, SchemesUseCases } from '@modules/classes'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray, groupBy } from '@utils/commons'
import { useClassModal } from '@app/composable/core/modals'
import { Router, useRouter } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { useListener } from '@app/composable/core/listener'

const store = {} as Record<string, {
	schemes: Ref<SchemeEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const markSchemeSeen = async (scheme: SchemeEntity, userId: string) => {
	if (!scheme.isRead(userId)) await SchemesUseCases.markRead(scheme.classId)
}

export const useSchemesList = (classId: string) => {
	const { id } = useAuth()
	if (store[classId] === undefined) {
		const listener = useListener(async () => {
			return await SchemesUseCases.listenToClassSchemes(classId, {
				created: async (entity) => {
					addToArray(store[classId].schemes.value, entity, (e) => e.id, (e) => e.start, true)
				},
				updated: async (entity) => {
					addToArray(store[classId].schemes.value, entity, (e) => e.id, (e) => e.start, true)
				},
				deleted: async (entity) => {
					store[classId].schemes.value = store[classId].schemes.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		store[classId] = {
			schemes: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const unReadSchemes = computed(() => store[classId].schemes.value.filter((s) => !s.isRead(id.value)).length)

	const fetchSchemes = async () => {
		await store[classId].setError('')
		try {
			await store[classId].setLoading(true)
			const schemes = await SchemesUseCases.getClassSchemes(classId)
			schemes.results.forEach((g) => addToArray(store[classId].schemes.value, g, (e) => e.id, (e) => e.start, true))
			store[classId].fetched.value = true
		} catch (error) {
			await store[classId].setError(error)
		}
		await store[classId].setLoading(false)
	}

	onMounted(async () => {
		if (!store[classId].fetched.value && !store[classId].loading.value) await fetchSchemes()
		await store[classId].listener.start()
	})
	onUnmounted(async () => {
		await store[classId].listener.close()
	})

	return {
		...store[classId], unReadSchemes,
		schemes: computed(() => groupBy(store[classId].schemes.value, (scheme) => scheme.title))
	}
}

let schemeClass = null as ClassEntity | null
export const getCreateSchemeClass = () => schemeClass
export const openCreateSchemeModal = async (classInst: ClassEntity, router: Router) => {
	schemeClass = classInst
	await router.push(`/classes/${classInst.id}/schemes/create`)
}

export const useCreateScheme = () => {
	const router = useRouter()
	const factory = new SchemeFactory()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	if (!schemeClass) useClassModal().closeCreateScheme()
	else factory.classId = schemeClass.id

	const createScheme = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				const scheme = await SchemesUseCases.add(factory)
				await setMessage('Scheme created successfully.')
				useClassModal().closeCreateScheme()
				factory.reset()
				await router.push(`/classes/${scheme.classId}/schemes`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { factory, error, loading, createScheme, schemeClass: schemeClass! }
}

let editingScheme = null as { classInst: ClassEntity, scheme: SchemeEntity } | null
export const getEditScheme = () => editingScheme
export const openEditSchemeModal = async (editSchemeInfo: { classInst: ClassEntity, scheme: SchemeEntity }, router: Router) => {
	editingScheme = editSchemeInfo
	await router.push(`/classes/${editSchemeInfo.scheme.classId}/schemes/${editSchemeInfo.scheme.id}/edit`)
}

export const useEditScheme = () => {
	const router = useRouter()
	const factory = new SchemeFactory()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	if (editingScheme) factory.loadEntity(editingScheme.scheme)
	else useClassModal().closeEditScheme()

	const editScheme = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				const scheme = await SchemesUseCases.update(editingScheme!.scheme.id, factory)
				await setMessage('Scheme updated successfully')
				useClassModal().closeEditScheme()
				factory.reset()
				await router.push(`/classes/${scheme.classId}/schemes`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { error, loading, factory, editScheme, schemeClass: editingScheme!.classInst }
}

export const useDeleteScheme = (classId: string, schemeId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteScheme = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to delete this scheme?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await SchemesUseCases.delete(classId, schemeId)
				await setMessage('Scheme deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteScheme }
}
