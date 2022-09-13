import { messageSW, Workbox } from 'workbox-window'
import { isWeb } from '@utils/constants'

export const registerServiceWorker = async () => {
	if (!isWeb || process.env.NODE_ENV !== 'development') return
	if (!('serviceWorker' in navigator)) return
	try {
		const wb = new Workbox('./service_worker.js')
		let registration: ServiceWorkerRegistration | undefined
		const showSkipWaitingPrompt = async () => {
			wb.addEventListener('controlling', window.location.reload)
			if (registration?.waiting) await messageSW(registration.waiting, { type: 'SKIP_WAITING' })
		}
		wb.addEventListener('waiting', showSkipWaitingPrompt)
		wb.addEventListener('externalwaiting' as any, showSkipWaitingPrompt)
		wb.register().then((reg) => registration = reg)
	} catch (err) {
		console.error(err)
	}
}
