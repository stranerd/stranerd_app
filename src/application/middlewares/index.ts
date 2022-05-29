import { RouteLocationNormalized } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { storage } from '@utils/storage'
import { REDIRECT_SESSION_NAME } from '@utils/constants'

type MiddlewareFunction = (d: { to: RouteLocationNormalized, from: RouteLocationNormalized }) => Promise<string | void>

export const defineMiddleware = (middleware: MiddlewareFunction) => middleware

export const hasQueryToken = defineMiddleware(async ({ to }) => {
	if (!to.query.token) return '/auth/signin'
})
export const isAccountVerified = defineMiddleware(async () => {
	if (!useAuth().user.value?.isVerified) return '/dashboard'
})
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

const globalMiddlewares = { isAuthenticated, isNotAuthenticated, isAdmin, hasQueryToken, isAccountVerified }
type Middleware = MiddlewareFunction | keyof typeof globalMiddlewares

export const generateMiddlewares = (middlewares: Middleware[]) => async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
	let redirect = null
	for (const middleware of middlewares) {
		const callback = typeof middleware === 'string' ? globalMiddlewares[middleware] : middleware
		const path = await callback?.({ to, from }).catch(() => null)
		if (!path) continue
		redirect = path
		break
	}

	if (redirect) return redirect
}
