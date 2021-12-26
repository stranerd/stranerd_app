import { computed, onMounted, Ref, ref } from 'vue'
import { AddSubject, DeleteSubject, FindSubject, GetSubjects, SubjectEntity, SubjectFactory } from '@modules/questions'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'

const global = {
	fetched: ref(false),
	subjects: ref([] as SubjectEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToGlobalSubjects = (subject: SubjectEntity) => {
	const index = global.subjects.value.findIndex((s) => s.id === subject.id)
	if (index !== -1) global.subjects.value.splice(index, 1, subject)
	else global.subjects.value.push(subject)
}

const fetchSubjects = async () => {
	await global.setError('')
	await global.setLoading(true)
	try {
		global.subjects.value = (await GetSubjects.call()).results
		global.fetched.value = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useSubjectList = () => {
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchSubjects()
	})

	return { ...global }
}

export const useSubject = (id: string) => {
	const subject = computed({
		get: () => global.subjects.value.find((s) => s.id === id) ?? null,
		set: (s) => {
			if (s) pushToGlobalSubjects(s)
		}
	})
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchSubjects()
	})

	return { subject }
}

export const useCreateSubject = () => {
	const factory = ref(new SubjectFactory()) as Ref<SubjectFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const createSubject = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const id = await AddSubject.call(factory.value)
				const subject = await FindSubject.call(id)
				if (subject) pushToGlobalSubjects(subject)
				factory.value.reset()
				await setMessage('Subject created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, createSubject }
}

export const useDeleteSubject = (subject: SubjectEntity) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteSubject = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to remove this subject?',
			text: 'This cannot be reversed',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteSubject.call(subject.id)
				global.subjects.value = global.subjects.value
					.filter((s) => s.id !== subject.id)
				await setMessage('Subject deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteSubject }
}
