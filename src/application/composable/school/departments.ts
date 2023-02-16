import { useSchoolModal } from '@app/composable/core/modals'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { DepartmentEntity, DepartmentFactory, DepartmentsUseCases } from '@modules/school'
import { addToArray } from '@utils/commons'
import { Alert } from '@utils/dialog'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const store = {
	fetched: ref(false),
	departments: ref([] as DepartmentEntity[]),
	faculties: {} as Record<string, boolean>,
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchDepartments = async (facultyId: string) => {
	if (store.faculties[facultyId]) return
	await store.setError('')
	await store.setLoading(true)
	try {
		const departments = await DepartmentsUseCases.getFacultyDepartments(facultyId)
		departments.results.forEach((c) => addToArray(store.departments.value, c, (e) => e.id, (e) => e.name, true))
		store.fetched.value = true
		store.faculties[facultyId] = true
	} catch (error) {
		await store.setError(error)
	}
	await store.setLoading(false)
}

export const useDepartmentList = () => {
	return { ...store, fetchDepartments }
}

export const useDepartment = (facultyId: string, id: string) => {
	const department = computed({
		get: () => store.departments.value.find((s) => s.id === id) ?? null,
		set: (c) => {
			if (c) addToArray(store.departments.value, c, (e) => e.id, (e) => e.name, true)
		}
	})
	onMounted(async () => {
		if (!store.faculties[facultyId]) await fetchDepartments(facultyId)
	})

	return { department }
}

let creatingFacultyDepartment = null as string | null
export const openDepartmentCreateModal = async (facultyId: string) => {
	creatingFacultyDepartment = facultyId
	useSchoolModal().openCreateDepartment()
}

export const useCreateDepartment = () => {
	const router = useRouter()
	const factory = new DepartmentFactory()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (creatingFacultyDepartment) factory.facultyId = creatingFacultyDepartment

	const createDepartment = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			await setLoading(true)
			try {
				const department = await DepartmentsUseCases.add(factory)
				addToArray(store.departments.value, department, (e) => e.id, (e) => e.name, true)
				factory.reset()
				useSchoolModal().closeCreateDepartment()
				await setMessage('Department created successfully')
				await router.push(`/admin/school/institutions/${department.institutionId}/faculties/${department.facultyId}/departments/${department.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { factory, loading, error, createDepartment }
}

let editingDepartment = null as DepartmentEntity | null
export const openDepartmentEditModal = async (department: DepartmentEntity) => {
	editingDepartment = department
	useSchoolModal().openEditDepartment()
}

export const useEditDepartment = () => {
	const router = useRouter()
	const factory = new DepartmentFactory()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingDepartment) factory.loadEntity(editingDepartment)
	else useSchoolModal().closeEditDepartment()

	const editDepartment = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			await setLoading(true)
			try {
				const updatedDepartment = await DepartmentsUseCases.update(editingDepartment!.id, factory)
				addToArray(store.departments.value, updatedDepartment, (e) => e.id, (e) => e.name, true)
				factory.reset()
				useSchoolModal().closeEditDepartment()
				await setMessage('Department updated successfully')
				await router.push(`/admin/school/institutions/${updatedDepartment.institutionId}/faculties/${updatedDepartment.facultyId}/departments/${updatedDepartment.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { factory, loading, error, editDepartment }
}

export const useDeleteDepartment = (departmentId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteDepartment = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to delete this department?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DepartmentsUseCases.delete(departmentId)
				store.departments.value = store.departments.value
					.filter((s) => s.id !== departmentId)
				await setMessage('Department deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteDepartment }
}
