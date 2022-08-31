import { computed, onMounted, Ref, ref, watch } from 'vue'
import { CourseEntity, CourseFactory, CoursesUseCases } from '@modules/school'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useSchoolModal } from '@app/composable/core/modals'
import { addToArray } from '@utils/commons'

const global = {
	fetched: ref(false),
	courses: ref([] as CourseEntity[]),
	departments: {} as Record<string, boolean>,
	faculties: {} as Record<string, boolean>,
	institutions: {} as Record<string, boolean>,
	searchMode: ref(false),
	searchValue: ref(''),
	searchResults: ref([] as CourseEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchDepartmentCourses = async (departmentId: string) => {
	if (global.departments[departmentId]) return
	await global.setError('')
	await global.setLoading(true)
	try {
		const courses = await CoursesUseCases.getDepartmentCourses(departmentId)
		courses.results.forEach((c) => addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true))
		global.fetched.value = true
		global.departments[departmentId] = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

const fetchFacultyCourses = async (facultyId: string, general = false) => {
	const key = general ? `${facultyId}-general` : facultyId
	if (global.faculties[key]) return
	await global.setError('')
	await global.setLoading(true)
	try {
		const courses = await CoursesUseCases.getFacultyCourses(facultyId, general)
		courses.results.forEach((c) => {
			addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true)
			if (c.departmentId) global.departments[c.departmentId] = true
			else global.faculties[`${c.facultyId}-general`] = true
		})
		global.fetched.value = true
		global.faculties[key] = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

const fetchInstitutionCourses = async (institutionId: string, general = false) => {
	const key = general ? `${institutionId}-general` : institutionId
	if (global.institutions[key]) return
	await global.setError('')
	await global.setLoading(true)
	try {
		const courses = await CoursesUseCases.getInstitutionCourses(institutionId, general)
		courses.results.forEach((c) => {
			addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true)
			if (c.facultyId) {
				global.faculties[c.facultyId] = true
				if (c.departmentId) global.departments[c.departmentId] = true
				else global.faculties[`${c.facultyId}-general`] = true
			} else global.institutions[`${institutionId}-general`] = true
		})
		global.fetched.value = true
		global.institutions[key] = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useCourseList = () => {
	const search = async () => {
		const searchValue = global.searchValue.value
		if (!searchValue) return
		global.searchMode.value = true
		await global.setError('')
		try {
			await global.setLoading(true)
			global.searchResults.value = await CoursesUseCases.search(searchValue)
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	watch(global.searchValue, () => {
		if (!global.searchValue.value) global.searchMode.value = false
	})

	return {
		...global, search,
		fetchDepartmentCourses, fetchFacultyCourses, fetchInstitutionCourses
	}
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
			const c = await CoursesUseCases.find(id)
			if (c) addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true)
		}
	})

	return { course }
}

let creatingCourseEntity = null as { institutionId: string, facultyId: string | null, departmentId: string | null } | null
export const openCourseCreateModal = async (institutionId: string, facultyId: string | null, departmentId: string | null) => {
	creatingCourseEntity = { institutionId, facultyId, departmentId }
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
				const course = await CoursesUseCases.add(factory.value)
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
				const updatedCourse = await CoursesUseCases.update(editingCourse!.id, factory.value)
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
				await CoursesUseCases.delete(courseId)
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
