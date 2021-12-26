import { useAuth } from '@app/composable/auth/auth'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import { defineMiddleware } from './'
import { storage } from '@utils/storage'

export const isAuthenticated = defineMiddleware(async ({ to }) => {
	if (!useAuth().isLoggedIn.value) {
		await storage.set(REDIRECT_SESSION_NAME, to.fullPath)
		return '/auth/signin'
	}
})
