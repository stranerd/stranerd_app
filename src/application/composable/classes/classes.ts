import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import { Router, useRouter } from 'vue-router'
import { ClassEntity, ClassesUseCases, ClassFactory, ClassUsers } from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useAuth } from '@app/composable/auth/auth'
import { UserEntity, UsersUseCases } from '@modules/users'
import { useRedirectToAuth } from '@app/composable/auth/session'
import { addToArray } from '@utils/commons'

const global = {
	classes: ref([] as ClassEntity[]),
	fetched: ref(false),
	searchTerm: ref(''),
	...useErrorHandler(),
	...useLoadingHandler()
}

const classGlobal = {} as Record<string, {
	hash: Ref<string>
	users: Ref<UserEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler> & ReturnType<typeof useSuccessHandler>>

export const useClassMembersList = (classInst: ClassEntity, skipHooks = false) => {
	const { id } = useAuth()
	const { redirect } = useRedirectToAuth()
	const listenerFn = async () => {
		return UsersUseCases.listenToUsersInList(classInst.membersAndRequests, {
			created: async (entity) => {
				addToArray(classGlobal[classInst.id].users.value, entity, (e) => e.id, (e) => e.bio.fullName, true)
			},
			updated: async (entity) => {
				addToArray(classGlobal[classInst.id].users.value, entity, (e) => e.id, (e) => e.bio.fullName, true)
			},
			deleted: async (entity) => {
				const index = classGlobal[classInst.id].users.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) classGlobal[classInst.id].users.value.splice(index, 1)
			}
		})
	}

	if (classGlobal[classInst.id] === undefined) {
		const listener = useListener(listenerFn)
		classGlobal[classInst.id] = {
			hash: ref(classInst.hash),
			users: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler(),
			...useSuccessHandler()
		}
	}

	const fetchUsers = async () => {
		await classGlobal[classInst.id].setError('')
		try {
			await classGlobal[classInst.id].setLoading(true)
			const users = await UsersUseCases.getUsersInList(classInst.membersAndRequests)
			users.forEach((user) => addToArray(classGlobal[classInst.id].users.value, user, (e) => e.id, (e) => e.bio.fullName, true))
			classGlobal[classInst.id].fetched.value = true
		} catch (error) {
			await classGlobal[classInst.id].setError(error)
		}
		await classGlobal[classInst.id].setLoading(false)
	}

	const requestToJoinClass = async (join: boolean) => {
		if (!id.value) return await redirect()
		const accepted = await Alert({
			title: `Are you sure you want to ${join ? 'join this class' : 'cancel this request'}?`,
			confirmButtonText: 'Yes!'
		})
		if (!accepted) return
		const isInClass = classInst?.members.includes(id.value)
		if (isInClass) return await classGlobal[classInst.id].setError('You are already a member of the class')
		const hasRequested = classInst?.requests.includes(id.value)
		if (hasRequested && join) return await classGlobal[classInst.id].setError('You have already requested to join the class')
		if (!hasRequested && !join) return await classGlobal[classInst.id].setError('You haven\'t requested to join the class yet')
		await classGlobal[classInst.id].setError('')
		await classGlobal[classInst.id].setLoading(true)
		try {
			await ClassesUseCases.requestClass(classInst.id, join)
			await classGlobal[classInst.id].setMessage(join ? 'Request sent successfully!' : 'Request cancelled successfully!')
		} catch (e) {
			await classGlobal[classInst.id].setError(e)
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
		await ClassesUseCases.acceptRequest(classInst.id, userId, accept)
			.catch(classGlobal[classInst.id].setError)
		await classGlobal[classInst.id].setMessage(accept ? 'Request accept!' : 'Request rejected!')
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
		await ClassesUseCases.leaveClass(classInst.id)
			.catch(classGlobal[classInst.id].setError)
		await classGlobal[classInst.id].setLoading(false)
	}

	const addToClass = async (userId: string, add: boolean) => {
		const accepted = await Alert({
			title: `Are you sure you want to ${add ? 'add this user to' : 'remove this user from'} the class?`,
			confirmButtonText: 'Yes!'
		})
		if (!accepted) return
		await classGlobal[classInst.id].setError('')
		await classGlobal[classInst.id].setLoading(true)
		await ClassesUseCases.addMembers(classInst.id, [userId], add)
			.catch(classGlobal[classInst.id].setError)
		await classGlobal[classInst.id].setMessage(add ? 'User added!' : 'User removed!')
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
		await ClassesUseCases.changeMemberRole(classInst.id, userId, role, add)
			.catch(classGlobal[classInst.id].setError)
		await classGlobal[classInst.id].setMessage(`Role ${role} ${add ? 'added' : 'removed'}!`)
		await classGlobal[classInst.id].setLoading(false)
	}

	onMounted(async () => {
		if (skipHooks) return
		if (!classGlobal[classInst.id].fetched.value && !classGlobal[classInst.id].loading.value) await fetchUsers()
		if (classGlobal[classInst.id].hash.value !== classInst.hash) {
			classGlobal[classInst.id].hash.value = classInst.hash
			await classGlobal[classInst.id].listener.reset(listenerFn)
		}
		await classGlobal[classInst.id].listener.start()
	})
	onUnmounted(async () => {
		if (skipHooks) return
		await classGlobal[classInst.id].listener.close()
	})

	const admins = computed(() => classGlobal[classInst.id].users.value.filter((user) => classInst.admins.includes(user.id)))
	const tutors = computed(() => classGlobal[classInst.id].users.value.filter((user) => classInst.tutors.includes(user.id)))
	const members = computed(() => classGlobal[classInst.id].users.value.filter((user) => classInst.participants.includes(user.id)))
	const requests = computed(() => classGlobal[classInst.id].users.value.filter((user) => classInst.requests.includes(user.id)))

	return {
		...classGlobal[classInst.id], admins, tutors, members, requests,
		acceptRequest, leaveClass, changeRole, addToClass, requestToJoinClass
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
				const classInst = await ClassesUseCases.add(factory.value)
				await setMessage('Class created successfully')
				factory.value.reset()
				await router.push(`/classes/${classInst.id}`)
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
			if (q) addToArray(global.classes.value, q, (e) => e.id, (e) => e.name, true)
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
			classInst = await ClassesUseCases.find(classId)
			if (classInst) addToArray(global.classes.value, classInst, (e) => e.id, (e) => e.name, true)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await ClassesUseCases.listenToOne(classId, {
			created: async (entity) => {
				addToArray(global.classes.value, entity, (e) => e.id, (e) => e.name, true)
			},
			updated: async (entity) => {
				addToArray(global.classes.value, entity, (e) => e.id, (e) => e.name, true)
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
			await ClassesUseCases.requestClass(classId, join)
			await setMessage(join ? 'Request sent successfully!' : 'Request cancelled successfully!')
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	onMounted(async () => {
		await fetchClass()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { error, loading, message, classInst, requestToJoinClass }
}

let editingClass = null as ClassEntity | null
export const getEditingClass = () => editingClass
export const openClassEditModal = async (classInst: ClassEntity, router: Router, openCourses = false) => {
	editingClass = classInst
	await router.push(`/classes/${classInst.id}/${openCourses ? 'courses' : 'edit'}`)
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
				await ClassesUseCases.update(editingClass!.id, factory.value)
				await setMessage('Class updated successfully')
				factory.value.reset()
				await router.push(`/classes/${editingClass!.id}`)
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
				await ClassesUseCases.delete(classId)
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
