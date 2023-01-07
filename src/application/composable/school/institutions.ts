import { computed, onMounted, Ref, ref } from 'vue'
import { InstitutionEntity, InstitutionFactory, InstitutionsUseCases } from '@modules/school'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useSchoolModal } from '@app/composable/core/modals'
import { addToArray } from '@utils/commons'
import { useRouter } from 'vue-router'

const store = {
	fetched: ref(false),
	institutions: ref([] as InstitutionEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchInstitutions = async () => {
	await store.setError('')
	await store.setLoading(true)
	try {
		const institutions = await InstitutionsUseCases.get()
		institutions.results.forEach((i) => addToArray(store.institutions.value, i, (e) => e.id, (e) => e.name, true))
		store.fetched.value = true
	} catch (error) {
		await store.setError(error)
	}
	await store.setLoading(false)
}

export const useInstitutionList = (skipHooks = false) => {
	const schools = computed(() => store.institutions.value.filter((i) => !i.isGateway))
	const gatewayExams = computed(() => store.institutions.value.filter((i) => i.isGateway))
	onMounted(async () => {
		if (skipHooks) return
		if (!store.fetched.value && !store.loading.value) await fetchInstitutions()
	})
	return { ...store, schools, gatewayExams }
}

export const useInstitution = (id: string) => {
	const institution = computed({
		get: () => store.institutions.value.find((s) => s.id === id) ?? null,
		set: (i) => {
			if (i) addToArray(store.institutions.value, i, (e) => e.id, (e) => e.name, true)
		}
	})
	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchInstitutions()
	})

	return { institution }
}

export const useCreateInstitution = () => {
	const router = useRouter()
	const factory = ref(new InstitutionFactory()) as Ref<InstitutionFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const createInstitution = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const institution = await InstitutionsUseCases.add(factory.value)
				addToArray(store.institutions.value, institution, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeCreateInstitution()
				await setMessage('Institution created successfully')
				await router.push(`/admin/school/institutions/${institution.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, createInstitution }
}

let editingInstitution = null as InstitutionEntity | null
export const openInstitutionEditModal = async (institution: InstitutionEntity) => {
	editingInstitution = institution
	useSchoolModal().openEditInstitution()
}

export const useEditInstitution = () => {
	const router = useRouter()
	const factory = ref(new InstitutionFactory()) as Ref<InstitutionFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingInstitution) factory.value.loadEntity(editingInstitution)
	else useSchoolModal().closeEditInstitution()

	const editInstitution = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const updatedInstitution = await InstitutionsUseCases.update(editingInstitution!.id, factory.value)
				addToArray(store.institutions.value, updatedInstitution, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeEditInstitution()
				await setMessage('Institution updated successfully')
				await router.push(`/admin/school/institutions/${updatedInstitution.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, editInstitution }
}

export const useDeleteInstitution = (institutionId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteInstitution = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to delete this institution?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await InstitutionsUseCases.delete(institutionId)
				store.institutions.value = store.institutions.value
					.filter((s) => s.id !== institutionId)
				await setMessage('Institution deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteInstitution }
}
