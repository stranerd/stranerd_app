import { createApp } from 'vue'
import AppComponent from './App.vue'
import { IonicVue } from '@ionic/vue'
import 'katex/dist/katex.min'
import '@app/assets/styles/index.scss'
import { parseLoggedInUser } from '@app/plugins/parseLoggedInUser'
import { ipAddressGetter } from '@app/plugins/ipAddressGetter'
import { authClient } from '@app/plugins/authClient'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { cssListeners } from '@app/plugins/cssListeners'
import { App } from '@capacitor/app'
import { domain } from '@utils/environment'
import { clearAllNotifications } from '@utils/push'
import { router } from '@app/router'
import { SplashScreen } from '@capacitor/splash-screen'
import { ChatScroll } from '@app/directives/chat-scroll'
import { registerServiceWorker } from './registerServiceWorker'

const globalPlugins = [parseLoggedInUser, authClient, ipAddressGetter, cssListeners]

const init = async () => {
	const app = createApp(AppComponent)

	for (const plugin of globalPlugins) await plugin({ app, router }).catch()

	app.use(router).use(IonicVue)
	app.directive('chat-scroll', ChatScroll)

	await router.isReady()

	app.mount('#app')
	await SplashScreen.hide()

	App.addListener('appUrlOpen', async (event) => {
		const path = event.url.split(domain).pop()
		await router.push(path ?? '/dashboard')
	})

	await defineCustomElements(window)

	await registerServiceWorker()

	await clearAllNotifications()
}

init().then()
