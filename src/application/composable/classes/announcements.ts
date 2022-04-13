import { computed, onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import {
	AddAnnouncement,
	AnnouncementEntity,
	AnnouncementFactory,
	ClassEntity,
	DeleteAnnouncement,
	GetAnnouncements,
	ListenToAnnouncements,
	UpdateAnnouncement
} from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { Router, useRouter } from 'vue-router'
import { useClassModal } from '@app/composable/core/modals'
import { storage } from '@utils/storage'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	announcements: Ref<AnnouncementEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
	readTime: Ref<number>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const getReadStateKey = (classId: string) => `classes-${classId}-announcements`

export const useAnnouncementList = (classId: string) => {
	if (global[classId] === undefined) {
		const listener = useListener(async () => {
			return await ListenToAnnouncements.call(classId, {
				created: async (entity) => {
					addToArray(global[classId].announcements.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(global[classId].announcements.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					global[classId].announcements.value = global[classId].announcements.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		global[classId] = {
			announcements: ref([]),
			fetched: ref(false),
			hasMore: ref(false),
			readTime: ref(0),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	watch(() => global[classId].readTime.value, async () => await storage.set(getReadStateKey(classId), global[classId].readTime.value))
	const unReadAnnouncements = computed(() => global[classId].announcements.value.filter((a) => a.createdAt > global[classId].readTime.value).length)

	const fetchAnnouncements = async () => {
		await global[classId].setError('')
		try {
			await global[classId].setLoading(true)
			const announcements = await GetAnnouncements.call(classId)
			announcements.results.forEach((a) => addToArray(global[classId].announcements.value, a, (e) => e.id, (e) => e.createdAt))
			global[classId].hasMore.value = !!announcements.pages.next
			global[classId].fetched.value = true
		} catch (error) {
			await global[classId].setError(error)
		}
		await global[classId].setLoading(false)
	}

	onMounted(async () => {
		if (!global[classId].fetched.value && !global[classId].loading.value) await fetchAnnouncements()
		const lastRead = await storage.get(getReadStateKey(classId))
		if (lastRead) global[classId].readTime.value = lastRead
		await global[classId].listener.start()
	})
	onUnmounted(async () => {
		await global[classId].listener.close()
	})

	return { ...global[classId], fetchOlderAnnouncements: fetchAnnouncements, unReadAnnouncements }
}

export const saveAnnouncementReadState = async (announcement: AnnouncementEntity) => {
	const key = getReadStateKey(announcement.classId)
	const lastRead = await storage.get(key)
	if (lastRead >= announcement.createdAt) return
	await storage.set(key, announcement.createdAt)
	if (global[announcement.classId]) global[announcement.classId].readTime.value = announcement.createdAt
}

let announcementClass = null as ClassEntity | null
export const getAnnouncementClass = () => announcementClass
export const openAnnouncementModal = async (classInst: ClassEntity, router: Router) => {
	announcementClass = classInst
	await router.push(`/classes/${classInst.id}/announcements/create`)
}

export const useCreateAnnouncement = (announcementClass: ClassEntity) => {
	const router = useRouter()
	const factory = ref(new AnnouncementFactory()) as Ref<AnnouncementFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	if (!announcementClass) useClassModal().closeCreateAnnouncement()
	else factory.value.classId = announcementClass!.id

	const createAnnouncement = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const announcement = await AddAnnouncement.call(factory.value)
				await setMessage('Announcement posted successfully.')
				factory.value.reset()
				useClassModal().closeCreateAnnouncement()
				await router.push(`/classes/${announcement.classId}/announcements/${announcement.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, createAnnouncement
	}
}

let editingAnnouncement = null as AnnouncementEntity | null
export const getEditingAnnouncement = () => editingAnnouncement
export const openAnnouncementEditModal = async (announcement: AnnouncementEntity, router: Router) => {
	editingAnnouncement = announcement
	await router.push(`/classes/${announcement.classId}/announcements/${announcement.id}/edit`)
}
export const useEditAnnouncement = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new AnnouncementFactory()) as Ref<AnnouncementFactory>
	const router = useRouter()

	if (editingAnnouncement) factory.value.loadEntity(editingAnnouncement)
	else useClassModal().closeEditAnnouncement()

	const editAnnouncement = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const announcement = await UpdateAnnouncement.call(editingAnnouncement!.id, factory.value)
				await setMessage('Announcement updated successfully')
				factory.value.reset()
				useClassModal().closeEditAnnouncement()
				await router.push(`/classes/${announcement.classId}/announcements/${announcement.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editAnnouncement }
}

export const useDeleteAnnouncement = (classId: string, announcementId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteAnnouncement = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this announcement?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteAnnouncement.call(classId, announcementId)
				await setMessage('Announcement deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteAnnouncement }
}
