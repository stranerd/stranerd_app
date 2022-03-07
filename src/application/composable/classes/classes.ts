import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import {
	AcceptClassRequest,
	AddClass,
	AddClassMembers,
	ChangeClassMemberRole,
	ClassEntity,
	ClassFactory,
	ClassUsers,
	DeleteClass,
	FindClass,
	GetMyClasses,
	LeaveClass,
	ListenToClass,
	ListenToMyClasses,
	RequestToJoinClass,
	UpdateClass
} from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useClassModal } from '@app/composable/core/modals'
import { useAuth } from '@app/composable/auth/auth'
import { GetUsersInList, ListenToUsersInList, UserEntity } from '@modules/users'
import { useRedirectToAuth } from '@app/composable/auth/session'

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

const classGlobal = {} as Record<string, {
	hash: Ref<string>
	users: Ref<UserEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

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

export const useClassMembersList = (classInst: ClassEntity) => {
	const { id } = useAuth()
	const listenerCallback = async () => {
		return ListenToUsersInList.call(classInst.membersAndRequests, {
			created: async (entity) => {
				const index = classGlobal[classInst.id].users.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) classGlobal[classInst.id].users.value.splice(index, 1, entity)
				else classGlobal[classInst.id].users.value.push(entity)
			},
			updated: async (entity) => {
				const index = classGlobal[classInst.id].users.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) classGlobal[classInst.id].users.value.splice(index, 1, entity)
				else classGlobal[classInst.id].users.value.push(entity)
			},
			deleted: async (entity) => {
				const index = classGlobal[classInst.id].users.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) classGlobal[classInst.id].users.value.splice(index, 1)
			}
		})
	}

	if (classGlobal[classInst.id] === undefined) {
		const listener = useListener(listenerCallback)
		classGlobal[classInst.id] = {
			hash: ref(classInst.hash),
			users: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchUsers = async () => {
		await classGlobal[classInst.id].setError('')
		try {
			await classGlobal[classInst.id].setLoading(true)
			const users = await GetUsersInList.call(classInst.membersAndRequests)
			users.forEach((user) => {
				const index = classGlobal[classInst.id].users.value.findIndex((q) => q.id === user.id)
				if (index !== -1) classGlobal[classInst.id].users.value.splice(index, 1, user)
				else classGlobal[classInst.id].users.value.push(user)
			})
			classGlobal[classInst.id].fetched.value = true
		} catch (error) {
			await classGlobal[classInst.id].setError(error)
		}
		await classGlobal[classInst.id].setLoading(false)
	}

	const acceptRequest = async (userId: string, accept: boolean) => {
		const accepted = await Alert({
			title: `Are you sure you want to ${accept ? 'accept' : 'reject'} this user's request?`,
			confirmButtonText: 'Yes!'
		})
		if (!accepted) return
		if (!classInst.requests.includes(userId)) return await classGlobal[classInst.id].setError('The user didn\'t request to join the class')
		await classGlobal[classInst.id].setError('')
		await classGlobal[classInst.id].setLoading(true)
		await AcceptClassRequest.call(classInst.id, userId, accept)
			.catch(classGlobal[classInst.id].setError)
		await classGlobal[classInst.id].setLoading(false)
	}

	const leaveClass = async () => {
		const accepted = await Alert({
			title: 'Are you sure you want to leave this class?',
			confirmButtonText: 'Yes!'
		})
		if (!accepted) return
		if (!classInst.members.includes(id.value)) return await classGlobal[classInst.id].setError('You are not a member of the class')
		await classGlobal[classInst.id].setError('')
		await classGlobal[classInst.id].setLoading(true)
		await LeaveClass.call(classInst.id)
			.catch(classGlobal[classInst.id].setError)
		await classGlobal[classInst.id].setLoading(false)
	}

	const removeFromClass = async (userId: string) => {
		const accepted = await Alert({
			title: 'Are you sure you want to remove this user from the class?',
			confirmButtonText: 'Yes!'
		})
		if (!accepted) return
		if (!classInst.members.includes(userId)) return await classGlobal[classInst.id].setError('User is not a member of the class')
		await classGlobal[classInst.id].setError('')
		await classGlobal[classInst.id].setLoading(true)
		await AddClassMembers.call(classInst.id, [userId], false)
			.catch(classGlobal[classInst.id].setError)
		await classGlobal[classInst.id].setLoading(false)
	}

	const changeRole = async (userId: string, role: ClassUsers, add: boolean) => {
		const accepted = await Alert({
			title: `Are you sure you want to ${add ? 'add this role to' : 'remove this role from'} the user?`,
			confirmButtonText: 'Yes!'
		})
		if (!accepted) return
		await classGlobal[classInst.id].setError('')
		await classGlobal[classInst.id].setLoading(true)
		await ChangeClassMemberRole.call(classInst.id, userId, role, add)
			.catch(classGlobal[classInst.id].setError)
		await classGlobal[classInst.id].setLoading(false)
	}

	onMounted(async () => {
		if (!classGlobal[classInst.id].fetched.value && !classGlobal[classInst.id].loading.value) await fetchUsers()
		if (classGlobal[classInst.id].hash.value !== classInst.hash) {
			classGlobal[classInst.id].hash.value = classInst.hash
			await classGlobal[classInst.id].listener.resetListener(listenerCallback)
		}
		await classGlobal[classInst.id].listener.startListener()
	})
	onUnmounted(async () => {
		await classGlobal[classInst.id].listener.closeListener()
	})

	const admins = computed(() => classGlobal[classInst.id].users.value.filter((user) => classInst.admins.includes(user.id)))
	const tutors = computed(() => classGlobal[classInst.id].users.value.filter((user) => classInst.tutors.includes(user.id)))
	const members = computed(() => classGlobal[classInst.id].users.value.filter((user) => classInst.participants.includes(user.id)))
	const requests = computed(() => classGlobal[classInst.id].users.value.filter((user) => classInst.requests.includes(user.id)))

	return {
		...classGlobal[classInst.id], admins, tutors, members, requests,
		acceptRequest, leaveClass, removeFromClass, changeRole
	}
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
	const { message, setMessage } = useSuccessHandler()
	const { id } = useAuth()
	const { redirect } = useRedirectToAuth()
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

	const requestToJoinClass = async (join: boolean) => {
		if (!id.value) return await redirect()
		const accepted = await Alert({
			title: `Are you sure you want to ${join ? 'join this class' : 'cancel this request'}?`,
			confirmButtonText: 'Yes!'
		})
		if (!accepted) return
		const isInClass = classInst.value?.members.includes(id.value)
		if (isInClass) return await setError('You are already a member of the class')
		const hasRequested = classInst.value?.requests.includes(id.value)
		if (hasRequested && join) return await setError('You have already requested to join the class')
		if (!hasRequested && !join) return await setError('You haven\'t requested to join the class yet')
		await setError('')
		await setLoading(true)
		try {
			await RequestToJoinClass.call(classId, join)
			await setMessage(join ? 'Request sent successfully!' : 'Request cancelled successfully!')
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	onMounted(async () => {
		await fetchClass()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { error, loading, message, classInst, requestToJoinClass }
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
