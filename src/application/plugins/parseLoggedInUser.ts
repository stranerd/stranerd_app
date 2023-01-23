import { useAuth } from '@app/composable/auth/auth'
import { AuthUseCases } from '@modules/auth'
import { deleteTokens, getTokens } from '@utils/tokens'
import { definePlugin } from '@app/plugins'
import { setEmailVerificationEmail } from '@app/composable/auth/signin'

export const parseLoggedInUser = definePlugin(async ({ router }) => {
	const { accessToken } = await getTokens()
	if (!accessToken) return
	const user = await AuthUseCases.getAuthUser().catch(() => null)
	if (!user) return await deleteTokens()
	const { isLoggedIn, isEmailVerified, signin, setAuthUser } = useAuth()
	await setAuthUser(user)
	if (!isEmailVerified.value) {
		setEmailVerificationEmail(user.email)
		await router.push('/auth/verify')
	}
	if (isLoggedIn.value) await signin(true, router)
})
