import { onUnmounted, onMounted, ref, Ref } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { GetNotifications, ListenToNotifications, MarkNotificationSeen, NotificationEntity } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'

const global = {} as Record<string, {
	notifications: Ref<NotificationEntity[]>
	hasMore: Ref<boolean>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToNotificationList = (userId: string, notification: NotificationEntity) => {
	const index = global[userId].notifications.value.findIndex((t) => t.id === notification.id)
	if (index !== -1) global[userId].notifications.value.splice(index, 1, notification)
	else global[userId].notifications.value.push(notification)
}

const unshiftToNotificationList = (userId: string, notification: NotificationEntity) => {
	const index = global[userId].notifications.value.findIndex((t) => t.id === notification.id)
	if (index !== -1) global[userId].notifications.value.splice(index, 1, notification)
	else global[userId].notifications.value.unshift(notification)
}

export const useNotificationList = (userId: string) => {
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			if (!userId) return () => {
			}
			const lastDate = global[userId].notifications.value[global[userId].notifications.value.length - 1]?.createdAt
			return ListenToNotifications.call(userId, {
				created: async (entity) => {
					unshiftToNotificationList(userId, entity)
				},
				updated: async (entity) => {
					unshiftToNotificationList(userId, entity)
				},
				deleted: async (entity) => {
					const index = global[userId].notifications.value.findIndex((t) => t.id === entity.id)
					if (index !== -1) global[userId].notifications.value.splice(index, 1)
				}
			}, lastDate)
		})
		global[userId] = {
			notifications: ref([]),
			hasMore: ref(false),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchNotifications = async () => {
		if (!userId) return
		await global[userId].setError('')
		await global[userId].setLoading(true)
		try {
			const lastDate = global[userId].notifications.value[global[userId].notifications.value.length - 1]?.createdAt
			const notifications = await GetNotifications.call(userId, lastDate)
			global[userId].hasMore.value = !!notifications.pages.next
			notifications.results.forEach((t) => pushToNotificationList(userId, t))
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	const fetchOlderNotifications = async () => {
		await fetchNotifications()
		await global[userId].listener.resetListener(async () => {
			if (!userId) return () => {
			}
			const lastDate = global[userId].notifications.value[global[userId].notifications.value.length - 1]?.createdAt
			return ListenToNotifications.call(userId, {
				created: async (entity) => {
					unshiftToNotificationList(userId, entity)
				},
				updated: async (entity) => {
					unshiftToNotificationList(userId, entity)
				},
				deleted: async (entity) => {
					const index = global[userId].notifications.value.findIndex((t) => t.id === entity.id)
					if (index !== -1) global[userId].notifications.value.splice(index, 1)
				}
			}, lastDate)
		})
	}

	onMounted(async () => {
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchNotifications()
		await global[userId].listener.startListener()
	})
	onUnmounted(async () => {
		// await global[userId].listener.closeListener()
	})

	return { ...global[userId], fetchOlderNotifications }
}

export const useNotification = (notification: NotificationEntity) => {
	const { id } = useAuth()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const markNotificationSeen = async () => {
		if (notification.seen) return
		await setError('')
		try {
			await setLoading(true)
			await MarkNotificationSeen.call(id.value!, notification.id, true)
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	return { loading, error, markNotificationSeen }
}
