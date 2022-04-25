import { computed, onMounted, Ref, ref } from 'vue'
import {
	AddInstitution,
	DeleteInstitution,
	EditInstitution,
	GetInstitutions,
	InstitutionEntity,
	InstitutionFactory
} from '@modules/school'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useSchoolModal } from '@app/composable/core/modals'
import { addToArray } from '@utils/commons'

const global = {
	fetched: ref(false),
	institutions: ref([] as InstitutionEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchInstitutions = async () => {
	await global.setError('')
	await global.setLoading(true)
	try {
		const institutions = await GetInstitutions.call()
		institutions.results.forEach((i) => addToArray(global.institutions.value, i, (e) => e.id, (e) => e.name, true))
		global.fetched.value = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useInstitutionList = (skipHooks = false) => {
	const schools = computed(() => global.institutions.value.filter((i) => !i.isGateway))
	const gatewayExams = computed(() => global.institutions.value.filter((i) => i.isGateway))
	onMounted(async () => {
		if (skipHooks) return
		if (!global.fetched.value && !global.loading.value) await fetchInstitutions()
	})
	return { ...global, schools, gatewayExams }
}

export const useInstitution = (id: string) => {
	const institution = computed({
		get: () => global.institutions.value.find((s) => s.id === id) ?? null,
		set: (i) => {
			if (i) addToArray(global.institutions.value, i, (e) => e.id, (e) => e.name, true)
		}
	})
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchInstitutions()
	})

	return { institution }
}

export const useCreateInstitution = () => {
	const factory = ref(new InstitutionFactory()) as Ref<InstitutionFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const createInstitution = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const institution = await AddInstitution.call(factory.value)
				addToArray(global.institutions.value, institution, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeCreateInstitution()
				await setMessage('Institution created successfully')
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
				const updatedInstitution = await EditInstitution.call(editingInstitution!.id, factory.value)
				addToArray(global.institutions.value, updatedInstitution, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeEditInstitution()
				await setMessage('Institution updated successfully')
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
			title: 'Are you sure you want to delete this institution?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteInstitution.call(institutionId)
				global.institutions.value = global.institutions.value
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
