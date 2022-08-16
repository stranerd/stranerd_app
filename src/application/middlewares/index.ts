import { NavigationGuardWithThis, RouteLocationNormalized } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { storage } from '@utils/storage'
import { REDIRECT_SESSION_NAME } from '@utils/constants'

type MiddleWareArgs = {
	to: RouteLocationNormalized,
	from: RouteLocationNormalized | null,
	goBackToNonAuth: () => string
}

type MiddlewareFunction = (d: MiddleWareArgs) => Promise<string | void>

export const defineMiddleware = (middleware: MiddlewareFunction) => middleware

export const isAdmin = defineMiddleware(async () => {
	if (!useAuth().isAdmin.value) return '/dashboard'
})
export const isNotAuthenticated = defineMiddleware(async () => {
	if (useAuth().isLoggedIn.value) return '/dashboard'
})
export const isAuthenticated = defineMiddleware(async ({ to }) => {
	if (!useAuth().isLoggedIn.value) {
		if (!to.fullPath.startsWith('/auth/')) await storage.set(REDIRECT_SESSION_NAME, to.fullPath)
		return '/auth/signin'
	}
	if (!useAuth().isEmailVerified.value) {
		if (!to.fullPath.startsWith('/auth/')) await storage.set(REDIRECT_SESSION_NAME, to.fullPath)
		return '/auth/verify'
	}
})

const globalMiddlewares = { isAuthenticated, isNotAuthenticated, isAdmin }
type Middleware = MiddlewareFunction | keyof typeof globalMiddlewares

export const generateMiddlewares = (middlewares: Middleware[]): NavigationGuardWithThis<undefined> => async (to, fromRoute) => {
	const from = fromRoute.name ? fromRoute : null
	let redirect = null
	for (const middleware of middlewares) {
		const callback = typeof middleware === 'string' ? globalMiddlewares[middleware] : middleware
		const goBackToNonAuth = () => {
			const backPath = from?.fullPath ?? '/dashboard'
			return backPath.startsWith('/auth/') ? '/dashboard' : backPath
		}
		const path = await callback?.({ to, from, goBackToNonAuth }).catch(() => null)
		if (!path) continue
		redirect = path
		break
	}
	if (redirect) return redirect === from?.fullPath ? false : redirect
}
