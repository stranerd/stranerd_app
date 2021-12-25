import { computed, onMounted, Ref, ref } from 'vue'
import {
	AddInstitution,
	DeleteInstitution,
	FindInstitution,
	GetInstitutions,
	InstitutionEntity,
	InstitutionFactory
} from '@modules/study'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@app/composable/core/notifications'

const global = {
	fetched: ref(false),
	institutions: ref([] as InstitutionEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToGlobalInstitutions = (institution: InstitutionEntity) => {
	const index = global.institutions.value.findIndex((s) => s.id === institution.id)
	if (index !== -1) global.institutions.value.splice(index, 1, institution)
	else global.institutions.value.push(institution)
}

const fetchInstitutions = async () => {
	await global.setError('')
	await global.setLoading(true)
	try {
		global.institutions.value = (await GetInstitutions.call()).results
		global.fetched.value = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useInstitutionList = () => {
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchInstitutions()
	})

	return { ...global }
}

export const useInstitution = (id: string) => {
	const institution = computed({
		get: () => global.institutions.value.find((s) => s.id === id) ?? null,
		set: (s) => {
			if (s) pushToGlobalInstitutions(s)
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
				const id = await AddInstitution.call(factory.value)
				const institution = await FindInstitution.call(id)
				if (institution) pushToGlobalInstitutions(institution)
				factory.value.reset()
				await setMessage('Institution created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, createInstitution }
}

export const useDeleteInstitution = (institution: InstitutionEntity) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteInstitution = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to remove this institution?',
			text: 'This cannot be reversed',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteInstitution.call(institution.id)
				global.institutions.value = global.institutions.value
					.filter((s) => s.id !== institution.id)
				await setMessage('Institution deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteInstitution }
}
