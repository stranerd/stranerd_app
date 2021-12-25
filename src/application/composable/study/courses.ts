import { computed, onMounted, Ref, ref } from 'vue'
import { AddCourse, CourseEntity, CourseFactory, DeleteCourse, FindCourse, GetCourses } from '@modules/study'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'

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

	return { ...global }
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

export const useCreateCourse = () => {
	const factory = ref(new CourseFactory()) as Ref<CourseFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const createCourse = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const id = await AddCourse.call(factory.value)
				const course = await FindCourse.call(id)
				if (course) pushToGlobalCourses(course)
				factory.value.reset()
				await setMessage('Course created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, createCourse }
}

export const useDeleteCourse = (course: CourseEntity) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteCourse = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to remove this course?',
			text: 'This cannot be reversed',
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
