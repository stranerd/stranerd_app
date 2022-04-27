import { computed, onMounted, Ref, ref } from 'vue'
import {
	AddCourse,
	CourseEntity,
	CourseFactory,
	DeleteCourse,
	EditCourse,
	FindCourse,
	GetCourses,
	GetInstitutionCourses
} from '@modules/school'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useSchoolModal } from '@app/composable/core/modals'
import { addToArray, groupBy } from '@utils/commons'

const global = {
	fetched: ref(false),
	courses: ref([] as CourseEntity[]),
	departments: {} as Record<string, boolean>,
	institutions: {} as Record<string, boolean>,
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchCourses = async (departmentId: string) => {
	if (global.departments[departmentId]) return
	await global.setError('')
	await global.setLoading(true)
	try {
		const courses = await GetCourses.call(departmentId)
		courses.results.forEach((c) => addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true))
		global.fetched.value = true
		global.departments[departmentId] = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

const fetchGeneralCourses = async (institutionId: string) => {
	const key = `${institutionId}-general`
	if (global.institutions[key]) return
	await global.setError('')
	await global.setLoading(true)
	try {
		const courses = await GetInstitutionCourses.call(institutionId, true)
		courses.results.forEach((c) => addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true))
		global.fetched.value = true
		global.institutions[key] = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

const fetchInstitutionCourses = async (institutionId: string) => {
	if (global.institutions[institutionId]) return
	await global.setError('')
	await global.setLoading(true)
	try {
		const courses = await GetInstitutionCourses.call(institutionId, false)
		courses.results.forEach((c) => addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true))
		global.fetched.value = true
		global.institutions[institutionId] = true
		groupBy(courses.results, (c) => c.departmentId ?? 'general').forEach(({ key }) => global.departments[key] = true)
		global.institutions[institutionId] = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useCourseList = () => {
	return { ...global, fetchCourses, fetchGeneralCourses, fetchInstitutionCourses }
}

export const useCourse = (id: string) => {
	const course = computed({
		get: () => global.courses.value.find((s) => s.id === id) ?? null,
		set: (c) => {
			if (c) addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true)
		}
	})
	onMounted(async () => {
		if (!course.value) {
			const c = await FindCourse.call(id)
			if (c) addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true)
		}
	})

	return { course }
}

let creatingCourseEntity = null as { institutionId: string, departmentId: string | null } | null
export const openCourseCreateModal = async (institutionId: string, departmentId: string | null) => {
	creatingCourseEntity = { institutionId, departmentId }
	useSchoolModal().openCreateCourse()
}

export const useCreateCourse = () => {
	const factory = ref(new CourseFactory()) as Ref<CourseFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (creatingCourseEntity) {
		factory.value.institutionId = creatingCourseEntity.institutionId
		factory.value.departmentId = creatingCourseEntity.departmentId
	} else useSchoolModal().closeCreateCourse()

	const createCourse = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const course = await AddCourse.call(factory.value)
				addToArray(global.courses.value, course, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeCreateCourse()
				await setMessage('Course created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, createCourse }
}

let editingCourse = null as CourseEntity | null
export const openCourseEditModal = async (course: CourseEntity) => {
	editingCourse = course
	useSchoolModal().openEditCourse()
}

export const useEditCourse = () => {
	const factory = ref(new CourseFactory()) as Ref<CourseFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingCourse) factory.value.loadEntity(editingCourse)
	else useSchoolModal().closeEditCourse()

	const editCourse = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const updatedCourse = await EditCourse.call(editingCourse!.id, factory.value)
				addToArray(global.courses.value, updatedCourse, (e) => e.id, (e) => e.name, true)
				factory.value.reset()
				useSchoolModal().closeEditCourse()
				await setMessage('Course updated successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, editCourse }
}

export const useDeleteCourse = (courseId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteCourse = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this course?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteCourse.call(courseId)
				global.courses.value = global.courses.value
					.filter((s) => s.id !== courseId)
				await setMessage('Course deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteCourse }
}
