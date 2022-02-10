import { PushNotifications } from '@capacitor/push-notifications'
import { Notify } from '@utils/dialog'
import { storage } from '@utils/storage'
import { isWeb } from '@utils/constants'

const STORAGE_KEY = 'user_device_token'

export const setupPush = async () => {
	if (isWeb) return

	await PushNotifications.addListener('registration', async ({ value: token }) => {
		const savedToken = await storage.get(STORAGE_KEY)
		if (savedToken == token) return
		await storage.set(STORAGE_KEY, token)
	})

	await PushNotifications.addListener('registrationError', async () => {
		await Notify({ title: 'Failed to register for push notifications. Restart the app to retry' })
	})

	await PushNotifications.addListener('pushNotificationReceived', async (notification) => {
		alert('Push received: ' + JSON.stringify(notification))
	})

	await PushNotifications.addListener('pushNotificationActionPerformed', async (notification) => {
		alert('Push action performed: ' + JSON.stringify(notification))
		await PushNotifications.removeAllDeliveredNotifications()
	})

	const result = await PushNotifications.requestPermissions()
	if (result.receive === 'granted') await PushNotifications.register()
	else await Notify({ title: 'Permissions are need to send push notifications. You can always change the permissions in your device\'s settings' })
}

export const clearAllNotifications = async () => {
	if (isWeb) return
	await PushNotifications.removeAllDeliveredNotifications()
}
