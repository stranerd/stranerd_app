import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { NotificationEntity, NotificationsUseCases } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray } from '@utils/commons'

const store = {} as Record<string, {
	notifications: Ref<NotificationEntity[]>
	hasMore: Ref<boolean>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
	unRead: Ref<number>
	timer: Ref<number>
	timeOut: Ref<any>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useNotificationList = () => {
	const { id } = useAuth()
	const userId = id.value
	if (store[userId] === undefined) {
		const listener = useListener(async () => {
			if (!userId) return () => {
			}
			return NotificationsUseCases.listen({
				created: async (entity) => {
					addToArray(store[userId].notifications.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(store[userId].notifications.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = store[userId].notifications.value.findIndex((t) => t.id === entity.id)
					if (index !== -1) store[userId].notifications.value.splice(index, 1)
				}
			}, store[userId].notifications.value.at(-1)?.createdAt)
		})
		store[userId] = {
			notifications: ref([]),
			hasMore: ref(false),
			fetched: ref(false),
			unRead: ref(0),
			timer: ref(0),
			timeOut: ref(null),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
		watch(store[userId].notifications, () => store[userId].timer.value++, { deep: true })
		watch(store[userId].timer, async (cur, prev) => prev > cur && cur === 0 && await fetchUnRead())
	}

	const fetchNotifications = async () => {
		if (!userId) return
		await store[userId].setError('')
		await store[userId].setLoading(true)
		try {
			const notifications = await NotificationsUseCases.get(store[userId].notifications.value.at(-1)?.createdAt)
			store[userId].hasMore.value = !!notifications.pages.next
			notifications.results.forEach((t) => addToArray(store[userId].notifications.value, t, (e) => e.id, (e) => e.createdAt))
			store[userId].fetched.value = true
		} catch (e) {
			await store[userId].setError(e)
		}
		await store[userId].setLoading(false)
	}

	const fetchOlderNotifications = async () => {
		await fetchNotifications()
		await store[userId].listener.restart()
	}

	const fetchUnRead = async () => {
		store[userId].unRead.value = await NotificationsUseCases.getUnReadCount()
	}

	onMounted(async () => {
		if (!store[userId].timeOut.value) store[userId].timeOut.value = setInterval(() => {
			if (store[userId].timer.value > 0) store[userId].timer.value--
		}, 500)
		if (!store[userId].fetched.value && !store[userId].loading.value) await fetchNotifications()
		await store[userId].listener.start()
	})
	onUnmounted(async () => {
		clearInterval(store[userId].timeOut.value)
		store[userId].timeOut.value = null
		// await store[userId].listener.close()
	})

	return { ...store[userId], fetchOlderNotifications }
}

export const useNotification = (notification: NotificationEntity) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const markNotificationSeen = async () => {
		if (notification.seen) return
		if (loading.value) return
		await setError('')
		try {
			await setLoading(true)
			await NotificationsUseCases.markSeen(notification.id, true)
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	return { loading, error, markNotificationSeen }
}
