import { computed, onMounted, Ref, ref } from 'vue'
import { AddFaculty, DeleteFaculty, EditFaculty, FacultyEntity, FacultyFactory, GetFaculties } from '@modules/school'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { useSchoolModal } from '@app/composable/core/modals'

const global = {
	fetched: ref(false),
	faculties: ref([] as FacultyEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchFaculties = async () => {
	await global.setError('')
	await global.setLoading(true)
	try {
		const faculties = await GetFaculties.call()
		faculties.results.forEach((c) => addToArray(global.faculties.value, c, (e) => e.id, (e) => e.name, true))
		global.fetched.value = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useFacultyList = () => {
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchFaculties()
	})
	return { ...global }
}

export const getFacultiesByInstitution = (institutionId: string) => computed({
	get: () => global.faculties.value.filter((c) => c.institutionId === institutionId),
	set: (faculties) => {
		faculties.forEach((c) => addToArray(global.faculties.value, c, (e) => e.id, (e) => e.name, true))
	}
})

export const useFaculty = (id: string) => {
	const faculty = computed({
		get: () => global.faculties.value.find((s) => s.id === id) ?? null,
		set: (c) => {
			if (c) addToArray(global.faculties.value, c, (e) => e.id, (e) => e.name, true)
		}
	})
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchFaculties()
	})

	return { faculty }
}

let creatingInstitutionFaculty = null as string | null
export const openFacultyCreateModal = async (institutionId: string) => {
	creatingInstitutionFaculty = institutionId
	useSchoolModal().openCreateFaculty()
}

export const useCreateFaculty = () => {
	const factory = ref(new FacultyFactory()) as Ref<FacultyFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (creatingInstitutionFaculty) factory.value.institutionId = creatingInstitutionFaculty

	const createFaculty = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const faculty = await AddFaculty.call(factory.value)
				addToArray(global.faculties.value, faculty, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeCreateFaculty()
				await setMessage('Faculty created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, createFaculty }
}

let editingFaculty = null as FacultyEntity | null
export const openFacultyEditModal = async (faculty: FacultyEntity) => {
	editingFaculty = faculty
	useSchoolModal().openEditFaculty()
}

export const useEditFaculty = () => {
	const factory = ref(new FacultyFactory()) as Ref<FacultyFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingFaculty) factory.value.loadEntity(editingFaculty)
	else useSchoolModal().closeEditFaculty()

	const editFaculty = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const updatedFaculty = await EditFaculty.call(editingFaculty!.id, factory.value)
				addToArray(global.faculties.value, updatedFaculty, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeEditFaculty()
				await setMessage('Faculty updated successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, editFaculty }
}

export const useDeleteFaculty = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteFaculty = async (faculty: FacultyEntity) => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this faculty?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteFaculty.call(faculty.id)
				global.faculties.value = global.faculties.value
					.filter((s) => s.id !== faculty.id)
				await setMessage('Faculty deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteFaculty }
}
