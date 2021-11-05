import { RouteLocationNormalized } from 'vue-router'
import isAuthenticated from '@app/middlewares/isAuthenticated'
import isNotAuthenticated from '@app/middlewares/isNotAuthenticated'
import isAdmin from '@app/middlewares/isAdmin'

export type Middleware = (d: { to: RouteLocationNormalized, from: RouteLocationNormalized }) => Promise<string | void>

export const defineMiddleware = (middleware: Middleware) => middleware

export const globalMiddlewares = {
	isAuthenticated, isNotAuthenticated, isAdmin
}
