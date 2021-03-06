import { computed, onMounted, Ref, ref } from 'vue'
import { FacultiesUseCases, FacultyEntity, FacultyFactory } from '@modules/school'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { useSchoolModal } from '@app/composable/core/modals'
import { useRouter } from 'vue-router'

const global = {
	fetched: ref(false),
	faculties: ref([] as FacultyEntity[]),
	institutions: {} as Record<string, boolean>,
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchFaculties = async (institutionId: string) => {
	if (global.institutions[institutionId]) return
	await global.setError('')
	await global.setLoading(true)
	try {
		const faculties = await FacultiesUseCases.getInstitutionFaculties(institutionId)
		faculties.results.forEach((c) => addToArray(global.faculties.value, c, (e) => e.id, (e) => e.name, true))
		global.fetched.value = true
		global.institutions[institutionId] = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useFacultyList = () => {
	return { ...global, fetchFaculties }
}

export const useFaculty = (institutionId: string, id: string) => {
	const faculty = computed({
		get: () => global.faculties.value.find((s) => s.id === id) ?? null,
		set: (c) => {
			if (c) addToArray(global.faculties.value, c, (e) => e.id, (e) => e.name, true)
		}
	})
	onMounted(async () => {
		if (!global.institutions[institutionId]) await fetchFaculties(institutionId)
	})

	return { faculty }
}

let creatingInstitutionFaculty = null as string | null
export const openFacultyCreateModal = async (institutionId: string) => {
	creatingInstitutionFaculty = institutionId
	useSchoolModal().openCreateFaculty()
}

export const useCreateFaculty = () => {
	const router = useRouter()
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
				const faculty = await FacultiesUseCases.add(factory.value)
				addToArray(global.faculties.value, faculty, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeCreateFaculty()
				await setMessage('Faculty created successfully')
				await router.push(`/admin/school/institutions/${faculty.institutionId}/faculties/${faculty.id}`)
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
	const router = useRouter()
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
				const updatedFaculty = await FacultiesUseCases.update(editingFaculty!.id, factory.value)
				addToArray(global.faculties.value, updatedFaculty, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeEditFaculty()
				await setMessage('Faculty updated successfully')
				await router.push(`/admin/school/institutions/${updatedFaculty.institutionId}/faculties/${updatedFaculty.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, editFaculty }
}

export const useDeleteFaculty = (facultyId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteFaculty = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this faculty?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await FacultiesUseCases.delete(facultyId)
				global.faculties.value = global.faculties.value
					.filter((s) => s.id !== facultyId)
				await setMessage('Faculty deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteFaculty }
}
