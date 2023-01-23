import { createApp } from 'vue'
import AppComponent from './App.vue'
import { IonicVue } from '@ionic/vue'
import 'katex/dist/katex.min'
import '@app/assets/styles/index.scss'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { parseLoggedInUser } from '@app/plugins/parseLoggedInUser'
import { cssListeners } from '@app/plugins/cssListeners'
import { App } from '@capacitor/app'
import { domain } from '@utils/environment'
import { clearAllNotifications } from '@utils/push'
import { router } from '@app/router'
import { SplashScreen } from '@capacitor/splash-screen'
import { ChatScroll } from '@app/directives/chat-scroll'

const globalPlugins = [parseLoggedInUser, cssListeners]

const init = async () => {
	const app = createApp(AppComponent)

	for (const plugin of globalPlugins) await plugin({ app, router }).catch()

	app.use(router)
		.use(IonicVue)
		.directive('chat-scroll', ChatScroll)
		.mount('#app')
	await router.isReady().catch()

	await Promise.all([
		SplashScreen.hide(),
		App.addListener('appUrlOpen', async (event) => {
			const path = event.url.split(domain).pop()
			await router.push(path ?? '/dashboard')
		}),
		defineCustomElements(window),
		clearAllNotifications()
	]).catch()
}

init().then()
