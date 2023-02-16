import { useSchoolModal } from '@app/composable/core/modals'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { CourseEntity, CourseFactory, CoursesUseCases } from '@modules/school'
import { addToArray } from '@utils/commons'
import { Alert } from '@utils/dialog'
import { computed, onMounted, ref, watch } from 'vue'

const store = {
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
	if (store.departments[departmentId]) return
	await store.setError('')
	await store.setLoading(true)
	try {
		const courses = await CoursesUseCases.getDepartmentCourses(departmentId)
		courses.results.forEach((c) => addToArray(store.courses.value, c, (e) => e.id, (e) => e.name, true))
		store.fetched.value = true
		store.departments[departmentId] = true
	} catch (error) {
		await store.setError(error)
	}
	await store.setLoading(false)
}

const fetchFacultyCourses = async (facultyId: string, general = false) => {
	const key = general ? `${facultyId}-general` : facultyId
	if (store.faculties[key]) return
	await store.setError('')
	await store.setLoading(true)
	try {
		const courses = await CoursesUseCases.getFacultyCourses(facultyId, general)
		courses.results.forEach((c) => {
			addToArray(store.courses.value, c, (e) => e.id, (e) => e.name, true)
			if (c.departmentId) store.departments[c.departmentId] = true
			else store.faculties[`${c.facultyId}-general`] = true
		})
		store.fetched.value = true
		store.faculties[key] = true
	} catch (error) {
		await store.setError(error)
	}
	await store.setLoading(false)
}

const fetchInstitutionCourses = async (institutionId: string, general = false) => {
	const key = general ? `${institutionId}-general` : institutionId
	if (store.institutions[key]) return
	await store.setError('')
	await store.setLoading(true)
	try {
		const courses = await CoursesUseCases.getInstitutionCourses(institutionId, general)
		courses.results.forEach((c) => {
			addToArray(store.courses.value, c, (e) => e.id, (e) => e.name, true)
			if (c.facultyId) {
				store.faculties[c.facultyId] = true
				if (c.departmentId) store.departments[c.departmentId] = true
				else store.faculties[`${c.facultyId}-general`] = true
			} else store.institutions[`${institutionId}-general`] = true
		})
		store.fetched.value = true
		store.institutions[key] = true
	} catch (error) {
		await store.setError(error)
	}
	await store.setLoading(false)
}

export const useCourseList = () => {
	const search = async () => {
		const searchValue = store.searchValue.value
		if (!searchValue) return
		store.searchMode.value = true
		await store.setError('')
		try {
			await store.setLoading(true)
			store.searchResults.value = await CoursesUseCases.search(searchValue)
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}

	watch(store.searchValue, () => {
		if (!store.searchValue.value) store.searchMode.value = false
	})

	return {
		...store, search,
		fetchDepartmentCourses, fetchFacultyCourses, fetchInstitutionCourses
	}
}

export const useCourse = (id: string) => {
	const course = computed({
		get: () => store.courses.value.find((s) => s.id === id) ?? null,
		set: (c) => {
			if (c) addToArray(store.courses.value, c, (e) => e.id, (e) => e.name, true)
		}
	})
	onMounted(async () => {
		if (!course.value) {
			const c = await CoursesUseCases.find(id)
			if (c) addToArray(store.courses.value, c, (e) => e.id, (e) => e.name, true)
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
	const factory = new CourseFactory()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (creatingCourseEntity) {
		factory.institutionId = creatingCourseEntity.institutionId
		factory.departmentId = creatingCourseEntity.departmentId
	} else useSchoolModal().closeCreateCourse()

	const createCourse = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			await setLoading(true)
			try {
				const course = await CoursesUseCases.add(factory)
				addToArray(store.courses.value, course, (e) => e.id, (e) => e.name, true)
				factory.reset()
				useSchoolModal().closeCreateCourse()
				await setMessage('Course created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { factory, loading, error, createCourse }
}

let editingCourse = null as CourseEntity | null
export const openCourseEditModal = async (course: CourseEntity) => {
	editingCourse = course
	useSchoolModal().openEditCourse()
}

export const useEditCourse = () => {
	const factory = new CourseFactory()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingCourse) factory.loadEntity(editingCourse)
	else useSchoolModal().closeEditCourse()

	const editCourse = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			await setLoading(true)
			try {
				const updatedCourse = await CoursesUseCases.update(editingCourse!.id, factory)
				addToArray(store.courses.value, updatedCourse, (e) => e.id, (e) => e.name, true)
				factory.reset()
				useSchoolModal().closeEditCourse()
				await setMessage('Course updated successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
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
			message: 'Are you sure you want to delete this course?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await CoursesUseCases.delete(courseId)
				store.courses.value = store.courses.value
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
