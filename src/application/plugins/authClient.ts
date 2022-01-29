import { useAuth } from '@app/composable/auth/auth'
import { definePlugin } from '@app/plugins/index'

export const authClient = definePlugin(async () => {
	const { isLoggedIn, isVerified, signin } = useAuth()
	if (isLoggedIn.value && isVerified.value) await signin(true)
})
