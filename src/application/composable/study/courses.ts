import { computed, onMounted, Ref, ref } from 'vue'
import {
	AddCourse,
	CourseEntity,
	CourseFactory,
	DeleteCourse,
	EditCourse,
	FindCourse,
	GetCourses
} from '@modules/study'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useStudyModal } from '@app/composable/core/modals'

const global = {
	fetched: ref(false),
	courses: ref([] as CourseEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToGlobalCourses = (course: CourseEntity) => {
	const index = global.courses.value.findIndex((s) => s.id === course.id)
	if (index !== -1) global.courses.value.splice(index, 1, course)
	else global.courses.value.push(course)
}

const fetchCourses = async () => {
	await global.setError('')
	await global.setLoading(true)
	try {
		global.courses.value = (await GetCourses.call()).results
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

	const courses = computed(() => global.courses.value.sort((a, b) => a.name < b.name ? -1 : 1))

	return { ...global, courses }
}

export const getCoursesByInstitution = (institutionId: string) => computed({
	get: () => global.courses.value.filter((c) => c.institutionId === institutionId),
	set: (courses) => {
		courses.forEach(pushToGlobalCourses)
	}
})

export const useCourse = (id: string) => {
	const course = computed({
		get: () => global.courses.value.find((s) => s.id === id) ?? null,
		set: (s) => {
			if (s) pushToGlobalCourses(s)
		}
	})
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchCourses()
	})

	return { course }
}

let creatingInstitutionCourse = null as string | null
export const getCreatingInstitutionCourse = () => creatingInstitutionCourse
export const openCourseCreateModal = async (institutionId: string) => {
	creatingInstitutionCourse = institutionId
	useStudyModal().openCreateCourse()
}

export const useCreateCourse = () => {
	const factory = ref(new CourseFactory()) as Ref<CourseFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (creatingInstitutionCourse) factory.value.institutionId = creatingInstitutionCourse

	const createCourse = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const id = await AddCourse.call(factory.value)
				const course = await FindCourse.call(id)
				if (course) pushToGlobalCourses(course)
				factory.value.reset()
				useStudyModal().closeCreateCourse()
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
export const getEditingCourse = () => editingCourse
export const openCourseEditModal = async (course: CourseEntity) => {
	editingCourse = course
	useStudyModal().openEditCourse()
}

export const useEditCourse = () => {
	const factory = ref(new CourseFactory()) as Ref<CourseFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingCourse) factory.value.loadEntity(editingCourse)
	else useStudyModal().closeEditCourse()

	const editCourse = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				await EditCourse.call(editingCourse!.id, factory.value)
				const updatedCourse = await FindCourse.call(editingCourse!.id)
				if (updatedCourse) pushToGlobalCourses(updatedCourse)
				factory.value.reset()
				useStudyModal().closeEditCourse()
				await setMessage('Course updated successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, editCourse }
}

export const useDeleteCourse = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteCourse = async (course: CourseEntity) => {
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
