import { getApps, initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from 'firebase/analytics'
import { firebaseConfig, isClient } from '@utils/environment'

export const analytics = {
	logEvent (eventName: string, data?: Record<string, any>) {
		if (isClient()) {
			if (getApps().length === 0) initializeApp(firebaseConfig)
			logEvent(getAnalytics(), eventName, data)
		}
	}
}
