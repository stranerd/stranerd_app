import { computed, onMounted, Ref, ref } from 'vue'
import {
	AddDepartment,
	DeleteDepartment,
	DepartmentEntity,
	DepartmentFactory,
	EditDepartment,
	GetDepartments
} from '@modules/school'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useSchoolModal } from '@app/composable/core/modals'
import { addToArray } from '@utils/commons'

const global = {
	fetched: ref(false),
	departments: ref([] as DepartmentEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchDepartments = async () => {
	await global.setError('')
	await global.setLoading(true)
	try {
		const departments = await GetDepartments.call()
		departments.results.forEach((c) => addToArray(global.departments.value, c, (e) => e.id, (e) => e.name, true))
		global.fetched.value = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useDepartmentList = () => {
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchDepartments()
	})
	return { ...global }
}

export const getDepartmentsByFaculty = (facultyId: string) => computed({
	get: () => global.departments.value.filter((c) => c.facultyId === facultyId),
	set: (departments) => {
		departments.forEach((c) => addToArray(global.departments.value, c, (e) => e.id, (e) => e.name, true))
	}
})

export const useDepartment = (id: string) => {
	const department = computed({
		get: () => global.departments.value.find((s) => s.id === id) ?? null,
		set: (c) => {
			if (c) addToArray(global.departments.value, c, (e) => e.id, (e) => e.name, true)
		}
	})
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchDepartments()
	})

	return { department }
}

let creatingFacultyDepartment = null as string | null
export const getCreatingFacultyDepartment = () => creatingFacultyDepartment
export const openDepartmentCreateModal = async (facultyId: string) => {
	creatingFacultyDepartment = facultyId
	useSchoolModal().openCreateDepartment()
}

export const useCreateDepartment = () => {
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
				const department = await AddDepartment.call(factory.value)
				addToArray(global.departments.value, department, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeCreateDepartment()
				await setMessage('Department created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, createDepartment }
}

let editingDepartment = null as DepartmentEntity | null
export const getEditingDepartment = () => editingDepartment
export const openDepartmentEditModal = async (department: DepartmentEntity) => {
	editingDepartment = department
	useSchoolModal().openEditDepartment()
}

export const useEditDepartment = () => {
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
				const updatedDepartment = await EditDepartment.call(editingDepartment!.id, factory.value)
				addToArray(global.departments.value, updatedDepartment, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeEditDepartment()
				await setMessage('Department updated successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, editDepartment }
}

export const useDeleteDepartment = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteDepartment = async (department: DepartmentEntity) => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this department?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteDepartment.call(department.id)
				global.departments.value = global.departments.value
					.filter((s) => s.id !== department.id)
				await setMessage('Department deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteDepartment }
}
