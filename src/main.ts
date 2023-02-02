import '@app/assets/styles/index.scss'
import { ChatScroll } from '@app/directives/chat-scroll'
import { cssListeners } from '@app/plugins/cssListeners'
import { parseLoggedInUser } from '@app/plugins/parseLoggedInUser'
import { router } from '@app/router'
import { App } from '@capacitor/app'
import { SplashScreen } from '@capacitor/splash-screen'
import { defineCustomElements } from '@ionic/pwa-elements/loader'
import { IonicVue } from '@ionic/vue'
import { domain } from '@utils/environment'
import { clearAllNotifications } from '@utils/push'
import 'katex/dist/katex.min'
import { createApp } from 'vue'
import AppComponent from './App.vue'

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
