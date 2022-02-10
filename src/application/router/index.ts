import { createRouter, createWebHistory } from '@ionic/vue-router'
import { routes } from '@app/router/routes'
import { allModals, allPopovers } from '@app/composable/core/modals'
import { showAddAnswer } from '@app/composable/questions/answers'
import { isAuthenticated } from '@app/middlewares/isAuthenticated'
import { isNotAuthenticated } from '@app/middlewares/isNotAuthenticated'
import { isAdmin } from '@app/middlewares/isAdmin'
import { hasQueryToken } from '@app/middlewares/hasQueryToken'
import { MiddlewareFunction } from '@app/middlewares'

export const globalMiddlewares = { isAuthenticated, isNotAuthenticated, isAdmin, hasQueryToken }
export type Middleware = MiddlewareFunction | keyof typeof globalMiddlewares

export const setupRouter = async () => {
	const router = createRouter({
		history: createWebHistory(),
		routes: await Promise.all(routes)
	})

	router.beforeEach(async (to, from, next) => {
		await Promise.all(allModals.map((modal) => modal().closeAll()))
		await Promise.all(allPopovers.map((popover) => popover().closeAll()))
		showAddAnswer.value = false

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
	router.afterEach(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	})

	return router
}

export const router = setupRouter()
