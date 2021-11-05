import { RouteLocationNormalized } from 'vue-router'

export type MiddlewareFunction = (d: { to: RouteLocationNormalized, from: RouteLocationNormalized }) => Promise<string | void>

export const defineMiddleware = (middleware: MiddlewareFunction) => middleware
