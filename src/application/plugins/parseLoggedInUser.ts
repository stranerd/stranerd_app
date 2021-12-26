import { useAuth } from '@app/composable/auth/auth'
import { GetAuthUser } from '@modules/auth'
import { saveTokens } from '@utils/tokens'
import { definePlugin } from '@app/plugins/index'
import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from '@utils/constants'
import { storage } from '@utils/storage'

export const parseLoggedInUser = definePlugin(async ({ router }) => {
	const accessToken = await storage.get(ACCESS_TOKEN_NAME)
	const refreshToken = await storage.get(REFRESH_TOKEN_NAME)

	if (accessToken && refreshToken) {
		await saveTokens({ accessToken, refreshToken })
		const user = await GetAuthUser.call().catch(() => null)
		if (user) {
			await useAuth().setAuthUser(user)
			if (user && !user.isVerified) await router.push('/auth/verify')
		} else {
			await saveTokens({ accessToken: null, refreshToken: null })
		}
	}
})
