import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { GroupEntity, GroupFactory, GroupsUseCases } from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { Router, useRouter } from 'vue-router'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	groups: Ref<GroupEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useGroupList = (classId: string) => {
	if (global[classId] === undefined) {
		const listener = useListener(async () => {
			return await GroupsUseCases.listenToClassGroups(classId, {
				created: async (entity) => {
					addToArray(global[classId].groups.value, entity, (e) => e.id, (e) => e.name, true)
				},
				updated: async (entity) => {
					addToArray(global[classId].groups.value, entity, (e) => e.id, (e) => e.name, true)
				},
				deleted: async (entity) => {
					global[classId].groups.value = global[classId].groups.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		global[classId] = {
			groups: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchGroups = async () => {
		await global[classId].setError('')
		try {
			await global[classId].setLoading(true)
			const groups = await GroupsUseCases.getClassGroups(classId)
			groups.results.forEach((g) => addToArray(global[classId].groups.value, g, (e) => e.id, (e) => e.name, true))
			global[classId].fetched.value = true
		} catch (error) {
			await global[classId].setError(error)
		}
		await global[classId].setLoading(false)
	}

	onMounted(async () => {
		if (!global[classId].fetched.value && !global[classId].loading.value) await fetchGroups()
		await global[classId].listener.start()
	})
	onUnmounted(async () => {
		await global[classId].listener.close()
	})

	return {
		error: global[classId].error,
		loading: global[classId].loading,
		groups: global[classId].groups
	}
}

let createClassId = null as string | null
export const setGroupClassId = (classId: string) => {
	createClassId = classId
}

export const useCreateGroup = () => {
	const router = useRouter()
	const factory = ref(new GroupFactory()) as Ref<GroupFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	if (createClassId) factory.value.classId = createClassId
	createClassId = null

	const createGroup = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const group = await GroupsUseCases.add(factory.value)
				await setMessage('Group created successfully.')
				factory.value.reset()
				await router.push(`/classes/${group.classId}/groups/${group.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, createGroup
	}
}

let editingGroup = null as GroupEntity | null
export const getEditingGroup = () => editingGroup
export const openGroupEditModal = async (group: GroupEntity, router: Router) => {
	editingGroup = group
	await router.push(`/classes/${group.classId}/groups/${group.id}/edit`)
}
export const useEditGroup = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new GroupFactory()) as Ref<GroupFactory>
	const router = useRouter()

	if (editingGroup) factory.value.loadEntity(editingGroup)

	const editGroup = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const group = await GroupsUseCases.update(editingGroup!.id, factory.value)
				await setMessage('Group updated successfully')
				factory.value.reset()
				await router.push(`/classes/${group.classId}/groups/${group.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editGroup }
}

export const useDeleteGroup = (classId: string, groupId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteGroup = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this group?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await GroupsUseCases.delete(classId, groupId)
				await setMessage('Group deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteGroup }
}
