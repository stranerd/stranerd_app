import { useAuth } from '@app/composable/auth/auth'
import { getTokens, saveTokens } from '@utils/tokens'
import { definePlugin } from '@app/plugins/index'

export const authClient = definePlugin(async () => {
	await saveTokens(await getTokens())
	const { isLoggedIn, isVerified, signin } = useAuth()
	if (isLoggedIn.value && isVerified.value) await signin(true)
})
