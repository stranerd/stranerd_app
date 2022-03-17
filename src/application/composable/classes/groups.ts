import { computed, onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import {
	AddGroup,
	ClassEntity,
	DeleteGroup,
	GetGroups,
	GroupEntity,
	GroupFactory,
	ListenToGroups,
	UpdateGroup
} from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { Router, useRouter } from 'vue-router'
import { useClassModal } from '@app/composable/core/modals'
import { storage } from '@utils/storage'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	groups: Ref<GroupEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
	readTime: Ref<number>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const getGroupReadStateKey = (classId: string) => `classes-${classId}-groups`

export const saveClassGroupsReadTime = (classId: string, time: number) => {
	if (global[classId]) global[classId].readTime.value = time
}

export const useGroupList = (classId: string) => {
	if (global[classId] === undefined) {
		const listener = useListener(async () => {
			return await ListenToGroups.call(classId, {
				created: async (entity) => {
					addToArray(global[classId].groups.value, entity, (e) => e.id, (e) => e.last?.createdAt ?? 0)
				},
				updated: async (entity) => {
					addToArray(global[classId].groups.value, entity, (e) => e.id, (e) => e.last?.createdAt ?? 0)
				},
				deleted: async (entity) => {
					global[classId].groups.value = global[classId].groups.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		global[classId] = {
			groups: ref([]),
			fetched: ref(false),
			readTime: ref(0),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	watch(() => global[classId].readTime.value, async () => await storage.set(getGroupReadStateKey(classId), global[classId].readTime.value))
	const unReadGroups = computed(() => global[classId].groups.value.filter((a) => (a.last?.createdAt ?? 0) > global[classId].readTime.value).length)

	const fetchGroups = async () => {
		await global[classId].setError('')
		try {
			await global[classId].setLoading(true)
			const groups = await GetGroups.call(classId)
			groups.results.forEach((g) => addToArray(global[classId].groups.value, g, (e) => e.id, (e) => e.last?.createdAt ?? 0))
			global[classId].fetched.value = true
		} catch (error) {
			await global[classId].setError(error)
		}
		await global[classId].setLoading(false)
	}

	onMounted(async () => {
		if (!global[classId].fetched.value && !global[classId].loading.value) await fetchGroups()
		const lastRead = await storage.get(getGroupReadStateKey(classId))
		if (lastRead) global[classId].readTime.value = lastRead
		await global[classId].listener.start()
	})
	onUnmounted(async () => {
		await global[classId].listener.close()
	})

	return {
		error: global[classId].error,
		loading: global[classId].loading,
		groups: global[classId].groups,
		unReadGroups
	}
}

let groupClass = null as ClassEntity | null
export const getGroupClass = () => groupClass
export const openGroupModal = async (classInst: ClassEntity, router: Router) => {
	groupClass = classInst
	await router.push(`/classes/${classInst.id}/groups/create`)
}

export const useCreateGroup = () => {
	const router = useRouter()
	const factory = ref(new GroupFactory()) as Ref<GroupFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	if (!groupClass) useClassModal().closeCreateGroup()
	else factory.value.classId = groupClass!.id

	const createGroup = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const group = await AddGroup.call(factory.value)
				await setMessage('Group created successfully.')
				factory.value.reset()
				useClassModal().closeCreateGroup()
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
	else useClassModal().closeEditGroup()

	const editGroup = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const group = await UpdateGroup.call(editingGroup!.id, factory.value)
				await setMessage('Group updated successfully')
				factory.value.reset()
				useClassModal().closeEditGroup()
				await router.push(`/classes/${group.classId}/groups/${group.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editGroup }
}

export const useDeleteGroup = (groupId: string) => {
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
				await DeleteGroup.call(groupId)
				await setMessage('Group deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteGroup }
}
