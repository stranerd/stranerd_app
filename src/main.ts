import { createApp } from 'vue'
import App from './App.vue'
import { routes } from '@app/router/routes'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { IonicVue } from '@ionic/vue'
import './application/assets/styles/index.scss'
import './application/assets/styles/tailwind.css'
<<<<<<< HEAD
import { GoogleAuth } from '@app/composable/auth/signin'
=======
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
import { MiddlewareFunction } from '@app/middlewares/'
import { isAuthenticated } from '@app/middlewares/isAuthenticated'
import { isNotAuthenticated } from '@app/middlewares/isNotAuthenticated'
import { isAdmin } from '@app/middlewares/isAdmin'
import { hasQueryToken } from '@app/middlewares/hasQueryToken'
import { registerComponents, registerIonicComponent } from '@app/plugins/components'
import { parseLoggedInUser } from '@app/plugins/parseLoggedInUser'
import { ipAddressGetter } from '@app/plugins/ipAddressGetter'
<<<<<<< HEAD

const globalMiddlewares = { isAuthenticated, isNotAuthenticated, isAdmin, hasQueryToken }
const globalPlugins = [parseLoggedInUser, registerIonicComponent, registerComponents, ipAddressGetter]
=======
import { authClient } from '@app/plugins/authClient'

const globalMiddlewares = { isAuthenticated, isNotAuthenticated, isAdmin, hasQueryToken }
const globalPlugins = [parseLoggedInUser, authClient, registerIonicComponent, registerComponents, ipAddressGetter]
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
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
<<<<<<< HEAD
			const path = await callback?.({ to, from })
=======
			const path = await callback?.({ to, from }).catch(() => null)
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
			if (!path) continue
			redirect = path
			break
		}

		if (redirect) next(redirect)
		else next()
	})
	router.afterEach(() => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }))

	const app = createApp(App)

<<<<<<< HEAD
	await Promise.all(globalPlugins.map((plugin) => plugin(app))).catch()

	app
		.use(router)
		.directive('g-auth', GoogleAuth)
=======
	for (const plugin of globalPlugins) await plugin({ app, router }).catch()

	app
		.use(router)
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
		.use(IonicVue)
	app.mount('#app')
}

<<<<<<< HEAD
init()
=======
init().then()
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
