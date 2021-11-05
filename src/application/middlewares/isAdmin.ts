import { useAuth } from '@app/composable/auth/auth'
import { defineMiddleware } from './'

export const isAdmin = defineMiddleware(async () => {
	if (!useAuth().isAdmin.value) return '/dashboard/home'
})
