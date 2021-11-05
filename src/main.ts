import { createApp } from 'vue'
import App from './App.vue'
import { routes } from '@app/router/routes'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { IonicVue } from '@ionic/vue'
import './application/assets/styles/index.scss'
import './application/assets/styles/tailwind.css'
import { setupPlugins } from '@app/plugins'
import { key, store } from '@app/store'
import { MiddlewareFunction } from '@app/middlewares/'
import { isAuthenticated } from '@app/middlewares/isAuthenticated'
import { isNotAuthenticated } from '@app/middlewares/isNotAuthenticated'
import { isAdmin } from '@app/middlewares/isAdmin'
import { hasQueryToken } from '@app/middlewares/hasQueryToken'

const globalMiddlewares = {
	isAuthenticated, isNotAuthenticated, isAdmin, hasQueryToken
}
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
			const path = await callback?.({ to, from })
			if (!path) continue
			redirect = path
			break
		}

		if (redirect) next(redirect)
		else next()
	})

	await setupPlugins().catch()
	createApp({
		components: { App }
	})
		.use(router)
		.use(store, key)
		.use(IonicVue)
		.mount('#app')
}

init()
