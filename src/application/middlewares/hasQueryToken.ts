import { defineMiddleware } from './'

export const hasQueryToken = defineMiddleware(async ({ to }) => {
	if (!to.query.token) return '/auth/signin'
})
