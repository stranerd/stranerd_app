import { PushNotifications } from '@capacitor/push-notifications'
import { Notify } from '@utils/dialog'
import { storage } from '@utils/storage'
import { isWeb } from '@utils/constants'
import { HttpClient } from '@modules/core'
import { apiBases, appName } from '@utils/environment'

const STORAGE_KEY = 'user_device_token'

export const setupPush = async (userId: string) => {
	if (isWeb) return

	await PushNotifications.addListener('registration', async ({ value: token }) => {
		const savedToken = await storage.get(STORAGE_KEY) as { token: string, userId: string }
		if (savedToken.userId === userId && savedToken.token == token) return
		await registerDevice(token, true)
		await storage.set(STORAGE_KEY, { token, userId })
	})

	await PushNotifications.addListener('registrationError', async () => {
		await Notify({ title: 'Failed to register for push notifications. Restart the app to retry' })
	})

	await PushNotifications.addListener('pushNotificationReceived', async (notification) => {
		alert('Push received: ' + JSON.stringify(notification))
	})

	await PushNotifications.addListener('pushNotificationActionPerformed', async (notification) => {
		alert('Push action performed: ' + JSON.stringify(notification))
		await clearAllNotifications()
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
	const utilsClient = new HttpClient(apiBases.UTILS)
	const res = await utilsClient.post<{ app: string, token: string }, boolean>(`/push/devices/${key}{`, {
		token, app: appName
	}).catch(() => false)
	if (!res) throw new Error(`Failed to ${key} device`)
}
