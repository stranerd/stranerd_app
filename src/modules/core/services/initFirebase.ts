import { getApps, initializeApp } from 'firebase/app'
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics'
import { firebaseConfig } from '@utils/environment'

export const analytics = {
	async logEvent (eventName: string, data?: Record<string, any>) {
		const supported = await isSupported().catch(() => false)
		if (supported) {
			if (getApps().length === 0) initializeApp(firebaseConfig)
			logEvent(getAnalytics(), eventName, data)
		}
	}
}
