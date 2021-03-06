import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { NotificationEntity, NotificationsUseCases } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
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
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			if (!userId) return () => {
			}
			return NotificationsUseCases.listen({
				created: async (entity) => {
					addToArray(global[userId].notifications.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(global[userId].notifications.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = global[userId].notifications.value.findIndex((t) => t.id === entity.id)
					if (index !== -1) global[userId].notifications.value.splice(index, 1)
				}
			}, global[userId].notifications.value.at(-1)?.createdAt)
		})
		global[userId] = {
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
		watch(global[userId].notifications, () => global[userId].timer.value++, { deep: true })
		watch(global[userId].timer, async (cur, prev) => prev > cur && cur === 0 && await fetchUnRead())
	}

	const fetchNotifications = async () => {
		if (!userId) return
		await global[userId].setError('')
		await global[userId].setLoading(true)
		try {
			const notifications = await NotificationsUseCases.get(global[userId].notifications.value.at(-1)?.createdAt)
			global[userId].hasMore.value = !!notifications.pages.next
			notifications.results.forEach((t) => addToArray(global[userId].notifications.value, t, (e) => e.id, (e) => e.createdAt))
			global[userId].fetched.value = true
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	const fetchOlderNotifications = async () => {
		await fetchNotifications()
		await global[userId].listener.restart()
	}

	const fetchUnRead = async () => {
		global[userId].unRead.value = await NotificationsUseCases.getUnReadCount()
	}

	onMounted(async () => {
		if (!global[userId].timeOut.value) global[userId].timeOut.value = setInterval(() => {
			if (global[userId].timer.value > 0) global[userId].timer.value--
		}, 500)
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchNotifications()
		await global[userId].listener.start()
	})
	onUnmounted(async () => {
		clearInterval(global[userId].timeOut.value)
		global[userId].timeOut.value = null
		// await global[userId].listener.close()
	})

	return { ...global[userId], fetchOlderNotifications }
}

export const useNotification = (notification: NotificationEntity) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const markNotificationSeen = async () => {
		if (notification.seen) return
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
