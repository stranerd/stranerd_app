import { useAuth } from '@app/composable/auth/auth'
import { definePlugin } from '@app/plugins/index'

export const authClient = definePlugin(async () => {
	const { isLoggedIn, isEmailVerified, signin } = useAuth()
	if (isLoggedIn.value && isEmailVerified.value) await signin(true)
})
