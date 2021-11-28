import { createApp } from 'vue'
import App from './App.vue'
import { routes } from '@app/router/routes'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { IonicVue } from '@ionic/vue'
import './application/assets/styles/index.scss'
import './application/assets/styles/tailwind.css'
import { MiddlewareFunction } from '@app/middlewares/'
import { isAuthenticated } from '@app/middlewares/isAuthenticated'
import { isNotAuthenticated } from '@app/middlewares/isNotAuthenticated'
import { isAdmin } from '@app/middlewares/isAdmin'
import { hasQueryToken } from '@app/middlewares/hasQueryToken'
import { registerComponents, registerIonicComponent } from '@app/plugins/components'
import { parseLoggedInUser } from '@app/plugins/parseLoggedInUser'
import { ipAddressGetter } from '@app/plugins/ipAddressGetter'
import { authClient } from '@app/plugins/authClient'
import VuePdf from 'vue3-pdfjs'


const globalMiddlewares = { isAuthenticated, isNotAuthenticated, isAdmin, hasQueryToken }
const globalPlugins = [parseLoggedInUser, authClient, registerIonicComponent, registerComponents, ipAddressGetter]
export type Middleware = MiddlewareFunction | keyof typeof globalMiddlewares


const init = async () => {
	const router = createRouter({
		history: createWebHistory(),
		routes: await Promise.all(routes)
	})

	router.beforeEach(async (to, from, next) => {
		const middlewares = (to.meta.middlewares ?? []) as Middleware[]
		let redirect = null
		for (const middleware of middlewares) {
			const callback = typeof middleware === 'string' ? globalMiddlewares[middleware] : middleware
			const path = await callback?.({ to, from }).catch(() => null)
			if (!path) continue
			redirect = path
			break
		}

		if (redirect) next(redirect)
		else next()
	})
	router.afterEach(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }))

	const app = createApp(App)

	for (const plugin of globalPlugins) await plugin({ app, router }).catch()
	//@ts-ignore
	app.use(VuePdf)
		.use(router)
		.use(IonicVue)
		
	app.mount('#app')
}

init().then()
