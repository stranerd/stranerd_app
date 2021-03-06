import { useAuth } from '@app/composable/auth/auth'
import { AuthUseCases } from '@modules/auth'
import { saveTokens } from '@utils/tokens'
import { definePlugin } from '@app/plugins/index'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@utils/constants'
import { storage } from '@utils/storage'
import { setEmailVerificationEmail } from '@app/composable/auth/signin'

export const parseLoggedInUser = definePlugin(async ({ router }) => {
	const accessToken = await storage.get(ACCESS_TOKEN_NAME)
	const refreshToken = await storage.get(REFRESH_TOKEN_NAME)

	if (accessToken && refreshToken) {
		await saveTokens({ accessToken, refreshToken })
		const user = await AuthUseCases.getAuthUser().catch(() => null)
		if (user) {
			await useAuth().setAuthUser(user)
			if (user && !user.isVerified) {
				setEmailVerificationEmail(user.email)
				await router.push('/auth/verify')
			}
		} else {
			await saveTokens({ accessToken: null, refreshToken: null })
		}
	}
})
