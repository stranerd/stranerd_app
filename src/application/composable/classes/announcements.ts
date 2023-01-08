import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { AnnouncementEntity, AnnouncementFactory, AnnouncementsUseCases } from '@modules/classes'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { Router, useRouter } from 'vue-router'
import { addToArray } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { useListener } from '@app/composable/core/listener'

const store = {} as Record<string, {
	announcements: Ref<AnnouncementEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const announcementStore = {} as Record<string, {
	announcement: Ref<AnnouncementEntity | null>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const markAnnouncementSeen = async (announcement: AnnouncementEntity, userId: string) => {
	if (!announcement.isRead(userId)) await AnnouncementsUseCases.markRead(announcement.classId)
}

export const useAnnouncementList = (classId: string) => {
	const { id } = useAuth()
	if (store[classId] === undefined) {
		const listener = useListener(async () => {
			return await AnnouncementsUseCases.listenToClassAnnouncements(classId, {
				created: async (entity) => {
					addToArray(store[classId].announcements.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(store[classId].announcements.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					store[classId].announcements.value = store[classId].announcements.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		store[classId] = {
			announcements: ref([]),
			fetched: ref(false),
			hasMore: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const unReadAnnouncements = computed(() => store[classId].announcements.value.filter((a) => !a.isRead(id.value)).length)

	const fetchAnnouncements = async () => {
		await store[classId].setError('')
		try {
			await store[classId].setLoading(true)
			const announcements = await AnnouncementsUseCases.getClassAnnouncements(classId, store[classId].announcements.value.at(-1)?.createdAt)
			announcements.results.forEach((a) => addToArray(store[classId].announcements.value, a, (e) => e.id, (e) => e.createdAt))
			store[classId].hasMore.value = !!announcements.pages.next
			store[classId].fetched.value = true
		} catch (error) {
			await store[classId].setError(error)
		}
		await store[classId].setLoading(false)
	}

	onMounted(async () => {
		if (!store[classId].fetched.value && !store[classId].loading.value) await fetchAnnouncements()
		await store[classId].listener.start()
	})
	onUnmounted(async () => {
		await store[classId].listener.close()
	})

	return { ...store[classId], fetchOlderAnnouncements: fetchAnnouncements, unReadAnnouncements }
}

export const useAnnouncement = (classId: string, id: string) => {
	if (store[id] === undefined) {
		const listener = useListener(async () => {
			return await AnnouncementsUseCases.listenToOne(classId, id, {
				created: async (entity) => {
					announcementStore[id].announcement.value = entity
				},
				updated: async (entity) => {
					announcementStore[id].announcement.value = entity
				},
				deleted: async (entity) => {
					announcementStore[id].announcement.value = entity
				}
			})
		})
		announcementStore[id] = {
			announcement: ref(null),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchAnnouncement = async () => {
		await announcementStore[id].setError('')
		try {
			await announcementStore[id].setLoading(true)
			announcementStore[id].announcement.value = await AnnouncementsUseCases.find(classId, id)
			announcementStore[id].fetched.value = true
		} catch (error) {
			await announcementStore[id].setError(error)
		}
		await announcementStore[id].setLoading(false)
	}

	onMounted(async () => {
		if (!announcementStore[id].fetched.value && !announcementStore[id].loading.value) await fetchAnnouncement()
		await announcementStore[id].listener.start()
	})
	onUnmounted(async () => {
		await announcementStore[id].listener.close()
	})

	return { ...announcementStore[id] }
}

let createClassId = null as string | null
export const setAnnouncementClassId = (classId: string) => {
	createClassId = classId
}

export const useCreateAnnouncement = () => {
	const router = useRouter()
	const factory = ref(new AnnouncementFactory()) as Ref<AnnouncementFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	if (createClassId) factory.value.classId = createClassId
	createClassId = null

	const createAnnouncement = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const announcement = await AnnouncementsUseCases.add(factory.value)
				await setMessage('Announcement posted successfully.')
				factory.value.reset()
				await router.push(`/classes/${announcement.classId}/announcements`)
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

	const editAnnouncement = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const announcement = await AnnouncementsUseCases.update(editingAnnouncement!.id, factory.value)
				await setMessage('Announcement updated successfully')
				factory.value.reset()
				await router.push(`/classes/${announcement.classId}/announcements`)
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
			message: 'Are you sure you want to delete this announcement?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await AnnouncementsUseCases.delete(classId, announcementId)
				await setMessage('Announcement deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteAnnouncement }
}
