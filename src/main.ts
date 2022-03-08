import { createApp } from 'vue'
import AppComponent from './App.vue'
import { IonicVue } from '@ionic/vue'
import 'katex/dist/katex.min'
import './application/assets/styles/index.scss'
import { registerComponents, registerIonicComponent } from '@app/plugins/components'
import { parseLoggedInUser } from '@app/plugins/parseLoggedInUser'
import { ipAddressGetter } from '@app/plugins/ipAddressGetter'
import { authClient } from '@app/plugins/authClient'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { cssListeners } from '@app/plugins/cssListeners'
import { App } from '@capacitor/app'
import { domain } from '@utils/environment'
import { clearAllNotifications } from '@utils/push'
import { router as setupRouter } from '@app/router'
import { SplashScreen } from '@capacitor/splash-screen'
import { ChatScroll } from '@app/directives/chat-scroll'

const globalPlugins = [parseLoggedInUser, authClient, registerIonicComponent, registerComponents, ipAddressGetter, cssListeners]

const init = async () => {
	const app = createApp(AppComponent)
	const router = await setupRouter

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

	await clearAllNotifications()
}

init().then()
