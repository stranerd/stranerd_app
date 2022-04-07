import { useAuth } from '@app/composable/auth/auth'
import { defineMiddleware } from './'

export const isAccountVerified = defineMiddleware(async ({ to }) => {
	if (!useAuth().user.value?.isVerified) return '/dashboard'
})
