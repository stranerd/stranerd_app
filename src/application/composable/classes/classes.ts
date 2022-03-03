import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import {
	AddClass,
	ClassEntity,
	ClassFactory,
	DeleteClass,
	FindClass,
	GetMyClasses,
	ListenToClass,
	ListenToMyClasses,
	UpdateClass
} from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useClassModal } from '@app/composable/core/modals'
import { useAuth } from '@app/composable/auth/auth'

const global = {
	classes: ref([] as ClassEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	const { id } = useAuth()
	if (!id.value) return () => {
	}
	return await ListenToMyClasses.call(id.value, {
		created: async (entity) => {
			unshiftToClassList(entity)
		},
		updated: async (entity) => {
			unshiftToClassList(entity)
		},
		deleted: async (entity) => {
			const index = global.classes.value.findIndex((q) => q.id === entity.id)
			if (index !== -1) global.classes.value.splice(index, 1)
		}
	})
})

const pushToClassList = (classInst: ClassEntity) => {
	const index = global.classes.value.findIndex((q) => q.id === classInst.id)
	if (index !== -1) global.classes.value.splice(index, 1, classInst)
	else global.classes.value.push(classInst)
}
const unshiftToClassList = (classInst: ClassEntity) => {
	const index = global.classes.value.findIndex((q) => q.id === classInst.id)
	if (index !== -1) global.classes.value.splice(index, 1, classInst)
	else global.classes.value.unshift(classInst)
}

export const useClassList = () => {
	const { id } = useAuth()
	const fetchClasses = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const classes = await GetMyClasses.call(id.value)
			classes.results.forEach(pushToClassList)
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	const myClasses = computed(() => global.classes.value.filter((q) => q.users.members.includes(id.value)))

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchClasses()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global, myClasses }
}

const factory = ref(new ClassFactory()) as Ref<ClassFactory>
export const useCreateClass = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()

	const createClass = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const classInst = await AddClass.call(factory.value)
				await setMessage('Class submitted successfully')
				factory.value.reset()
				useClassModal().closeCreateClass()
				await router.replace(`/classes/${classInst.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, createClass }
}

export const useClass = (classId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const classInst = computed({
		get: () => global.classes.value.find((q) => q.id === classId) ?? null,
		set: (q) => {
			if (q) pushToClassList(q)
		}
	})

	const fetchClass = async () => {
		await setError('')
		try {
			await setLoading(true)
			let classInst = global.classes.value.find((q) => q.id === classId) ?? null
			if (classInst) {
				await setLoading(false)
				return
			}
			classInst = await FindClass.call(classId)
			if (classInst) unshiftToClassList(classInst)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await ListenToClass.call(classId, {
			created: async (entity) => {
				unshiftToClassList(entity)
			},
			updated: async (entity) => {
				unshiftToClassList(entity)
			},
			deleted: async (entity) => {
				const index = global.classes.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.classes.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		await fetchClass()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { error, loading, classInst }
}

let editingClass = null as ClassEntity | null
export const getEditingClass = () => editingClass
export const openClassEditModal = async (classInst: ClassEntity, router: Router) => {
	editingClass = classInst
	await router.push(`/classes/${classInst.id}/edit`)
}
export const useEditClass = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()
	const factory = ref(new ClassFactory()) as Ref<ClassFactory>
	if (editingClass) factory.value.loadEntity(editingClass)

	const editClass = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await UpdateClass.call(editingClass!.id, factory.value)
				await setMessage('Class edited successfully')
				// useClassModal().closeEditClass()
				factory.value.reset()
				await router.replace(`/classes/${editingClass!.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editClass }
}

export const useDeleteClass = (classId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()

	const deleteClass = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this class?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteClass.call(classId)
				global.classes.value = global.classes.value
					.filter((q) => q.id !== classId)
				await setMessage('Class deleted successfully')
				await router.push('/classes')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteClass }
}
