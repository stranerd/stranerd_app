import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { ClassEntity, SchemeEntity, SchemeFactory, SchemesUseCases } from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { useClassModal } from '@app/composable/core/modals'
import { Router, useRouter } from 'vue-router'

const global = {} as Record<string, {
	schemes: Ref<SchemeEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useSchemesList = (classId: string) => {
	if (global[classId] === undefined) {
		const listener = useListener(async () => {
			return await SchemesUseCases.listenToClassSchemes(classId, {
				created: async (entity) => {
					addToArray(global[classId].schemes.value, entity, (e) => e.id, (e) => e.start, true)
				},
				updated: async (entity) => {
					addToArray(global[classId].schemes.value, entity, (e) => e.id, (e) => e.start, true)
				},
				deleted: async (entity) => {
					global[classId].schemes.value = global[classId].schemes.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		global[classId] = {
			schemes: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchSchemes = async () => {
		await global[classId].setError('')
		try {
			await global[classId].setLoading(true)
			const schemes = await SchemesUseCases.getClassSchemes(classId)
			schemes.results.forEach((g) => addToArray(global[classId].schemes.value, g, (e) => e.id, (e) => e.start, true))
			global[classId].fetched.value = true
		} catch (error) {
			await global[classId].setError(error)
		}
		await global[classId].setLoading(false)
	}

	onMounted(async () => {
		if (!global[classId].fetched.value && !global[classId].loading.value) await fetchSchemes()
		await global[classId].listener.start()
	})
	onUnmounted(async () => {
		await global[classId].listener.close()
	})

	return {
		error: global[classId].error,
		loading: global[classId].loading,
		schemes: global[classId].schemes
	}
}

let schemeClass = null as ClassEntity | null
export const getCreateSchemeClass = () => schemeClass
export const openCreateSchemeModal = async (classInst: ClassEntity, router: Router) => {
	schemeClass = classInst
	await router.push(`/classes/${classInst.id}/scheme/create`)
}

export const useCreateScheme = () => {
	const router = useRouter()
	const factory = ref(new SchemeFactory()) as Ref<SchemeFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	if (!schemeClass) useClassModal().closeCreateScheme()
	else factory.value.classId = schemeClass.id

	const createScheme = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const scheme = await SchemesUseCases.add(factory.value)
				await setMessage('Scheme created successfully.')
				useClassModal().closeCreateScheme()
				factory.value.reset()
				await router.push(`/classes/${scheme.classId}/scheme`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, error, loading, createScheme, schemeClass }
}

let editingScheme = null as { classInst: ClassEntity, scheme: SchemeEntity } | null
export const getEditScheme = () => editingScheme
export const openEditSchemeModal = async (editSchemeInfo: { classInst: ClassEntity, scheme: SchemeEntity }, router: Router) => {
	editingScheme = editSchemeInfo
	await router.push(`/classes/${editSchemeInfo.scheme.classId}/scheme/${editSchemeInfo.scheme.id}/edit`)
}

export const useEditScheme = () => {
	const router = useRouter()
	const factory = ref(new SchemeFactory()) as Ref<SchemeFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	if (editingScheme) factory.value.loadEntity(editingScheme.scheme)
	else useClassModal().closeEditScheme()

	const editScheme = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const scheme = await SchemesUseCases.update(editingScheme!.scheme.id, factory.value)
				await setMessage('Scheme updated successfully')
				useClassModal().closeEditScheme()
				factory.value.reset()
				await router.push(`/classes/${scheme.classId}/scheme`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editScheme, schemeClass: editingScheme!.classInst }
}

export const useDeleteScheme = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteScheme = async (scheme: SchemeEntity) => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this scheme?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await SchemesUseCases.delete(scheme.classId, scheme.id)
				await setMessage('Scheme deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteScheme }
}
