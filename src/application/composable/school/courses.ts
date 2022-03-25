import { computed, onMounted, Ref, ref } from 'vue'
import { AddCourse, CourseEntity, CourseFactory, DeleteCourse, EditCourse, GetCourses } from '@modules/school'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useSchoolModal } from '@app/composable/core/modals'
import { addToArray } from '@utils/commons'

const global = {
	fetched: ref(false),
	courses: ref([] as CourseEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchCourses = async () => {
	await global.setError('')
	await global.setLoading(true)
	try {
		const courses = await GetCourses.call()
		courses.results.forEach((c) => addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true))
		global.fetched.value = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useCourseList = () => {
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchCourses()
	})
	return { ...global }
}

export const getCoursesByInstitution = (institutionId: string) => computed({
	get: () => global.courses.value.filter((c) => c.institutionId === institutionId),
	set: (courses) => {
		courses.forEach((c) => addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true))
	}
})

export const useCourse = (id: string) => {
	const course = computed({
		get: () => global.courses.value.find((s) => s.id === id) ?? null,
		set: (c) => {
			if (c) addToArray(global.courses.value, c, (e) => e.id, (e) => e.name, true)
		}
	})
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchCourses()
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

export const useDeleteCourse = (course: CourseEntity) => {
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
				await DeleteCourse.call(course.id)
				global.courses.value = global.courses.value
					.filter((s) => s.id !== course.id)
				await setMessage('Course deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteCourse }
}
