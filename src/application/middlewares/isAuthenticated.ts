import { useAuth } from '@app/composable/auth/auth'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import { serializeToCookie } from '@utils/cookie'
import { defineMiddleware } from './'

export const isAuthenticated = defineMiddleware(async ({ to }) => {
	if (!useAuth().isLoggedIn.value) {
		document.cookie = serializeToCookie(REDIRECT_SESSION_NAME, to.fullPath)
		return '/auth/signin'
	}
})
