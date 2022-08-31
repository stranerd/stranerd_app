import { computed, onMounted, Ref, ref } from 'vue'
import { DepartmentEntity, DepartmentFactory, DepartmentsUseCases } from '@modules/school'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useSchoolModal } from '@app/composable/core/modals'
import { addToArray } from '@utils/commons'
import { useRouter } from 'vue-router'

const global = {
	fetched: ref(false),
	departments: ref([] as DepartmentEntity[]),
	faculties: {} as Record<string, boolean>,
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchDepartments = async (facultyId: string) => {
	if (global.faculties[facultyId]) return
	await global.setError('')
	await global.setLoading(true)
	try {
		const departments = await DepartmentsUseCases.getFacultyDepartments(facultyId)
		departments.results.forEach((c) => addToArray(global.departments.value, c, (e) => e.id, (e) => e.name, true))
		global.fetched.value = true
		global.faculties[facultyId] = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useDepartmentList = () => {
	return { ...global, fetchDepartments }
}

export const useDepartment = (facultyId: string, id: string) => {
	const department = computed({
		get: () => global.departments.value.find((s) => s.id === id) ?? null,
		set: (c) => {
			if (c) addToArray(global.departments.value, c, (e) => e.id, (e) => e.name, true)
		}
	})
	onMounted(async () => {
		if (!global.faculties[facultyId]) await fetchDepartments(facultyId)
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
	const factory = ref(new DepartmentFactory()) as Ref<DepartmentFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (creatingFacultyDepartment) factory.value.facultyId = creatingFacultyDepartment

	const createDepartment = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const department = await DepartmentsUseCases.add(factory.value)
				addToArray(global.departments.value, department, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeCreateDepartment()
				await setMessage('Department created successfully')
				await router.push(`/admin/school/institutions/${department.institutionId}/faculties/${department.facultyId}/departments/${department.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
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
	const factory = ref(new DepartmentFactory()) as Ref<DepartmentFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingDepartment) factory.value.loadEntity(editingDepartment)
	else useSchoolModal().closeEditDepartment()

	const editDepartment = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const updatedDepartment = await DepartmentsUseCases.update(editingDepartment!.id, factory.value)
				addToArray(global.departments.value, updatedDepartment, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeEditDepartment()
				await setMessage('Department updated successfully')
				await router.push(`/admin/school/institutions/${updatedDepartment.institutionId}/faculties/${updatedDepartment.facultyId}/departments/${updatedDepartment.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
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
			title: 'Are you sure you want to delete this department?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DepartmentsUseCases.delete(departmentId)
				global.departments.value = global.departments.value
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
