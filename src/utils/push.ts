import { PushNotifications } from '@capacitor/push-notifications'
import { Notify } from '@utils/dialog'
import { storage } from '@utils/storage'
import { isWeb } from '@utils/constants'
import { HttpClient } from '@modules/core'
import { NotificationEntity, NotificationsUseCases } from '@modules/users'
import { router } from '@app/router'
import { ChatData, ChatEntity } from '@modules/messaging'

const STORAGE_KEY = 'user_device_token'

export const setupPush = async (userId: string) => {
	if (isWeb) return

	await PushNotifications.addListener('registration', async ({ value: token }) => {
		const savedToken = await storage.get(STORAGE_KEY)
		if (savedToken?.userId === userId && savedToken?.token == token) return
		await registerDevice(token, true)
		await storage.set(STORAGE_KEY, { token, userId })
	})

	await PushNotifications.addListener('registrationError', async () => {
		await Notify({ title: 'Failed to register for push notifications. Restart the app to retry' })
	})

	await PushNotifications.addListener('pushNotificationReceived', async (notification) => {
		const parsed = JSON.parse(notification.data.value) as PushValue
		if (parsed.type === 'notifications') await NotificationsUseCases.markSeen(parsed.data.id, true)
	})

	await PushNotifications.addListener('pushNotificationActionPerformed', async ({ notification }) => {
		await clearAllNotifications()
		const parsed = JSON.parse(notification.data.value) as PushValue
		if (parsed.type === 'chats') await router.push(ChatEntity.getLink(parsed.data.to, parsed.data.data))
		else if (parsed.type === 'notifications') await router.push(NotificationEntity.getLink(parsed.data as any))
		else await router.push('/notifications')
	})

	const result = await PushNotifications.requestPermissions()
	if (result.receive === 'granted') await PushNotifications.register()
	else await Notify({ title: 'Permissions are needed to send push notifications. You can always change the permissions in your device\'s settings' })
}

export const clearAllNotifications = async () => {
	if (isWeb) return
	await PushNotifications.removeAllDeliveredNotifications()
}

const registerDevice = async (token: string, subscribe: boolean) => {
	const key = subscribe ? 'subscribe' : 'unsubscribe'
	const utilsClient = new HttpClient()
	const res = await utilsClient.post<{ token: string }, boolean>(`/push/devices/${key}`, { token }).catch(() => false)
	if (!res) throw new Error(`Failed to ${key} device`)
}

export const unregisterDeviceOnLogout = async () => {
	const savedToken = await storage.get(STORAGE_KEY) as { token: string, userId: string }
	if (!savedToken) return
	await registerDevice(savedToken.token, false)
	await storage.remove(STORAGE_KEY)
}

type NotificationPushData = {
	type: 'notifications'
	data: {
		id: string
		action: string
		data: Record<string, any>
	}
}

type ChatPushData = {
	type: 'chats'
	data: {
		id: string
		to: string
		data: ChatData
	}
}

type PushValue = NotificationPushData | ChatPushData
