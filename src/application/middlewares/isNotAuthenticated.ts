import { useAuth } from '@app/composable/auth/auth'
import { defineMiddleware } from './'

export const isNotAuthenticated = defineMiddleware(async ({ to }) => {
	if (useAuth().isLoggedIn.value) return '/dashboard/'
})
