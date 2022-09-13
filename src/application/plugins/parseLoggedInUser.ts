import { useAuth } from '@app/composable/auth/auth'
import { AuthUseCases } from '@modules/auth'
import { deleteTokens, getTokens } from '@utils/tokens'
import { definePlugin } from '@app/plugins/index'
import { setEmailVerificationEmail } from '@app/composable/auth/signin'

export const parseLoggedInUser = definePlugin(async ({ router }) => {
	const { accessToken } = await getTokens()
	if (!accessToken) return
	const user = await AuthUseCases.getAuthUser().catch(() => null)
	if (!user) return await deleteTokens()
	await useAuth().setAuthUser(user)
	if (user && !user.isVerified) {
		setEmailVerificationEmail(user.email)
		await router.push('/auth/verify')
	}
})
