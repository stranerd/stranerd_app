import { useAuth } from '@app/composable/auth/auth'
import { GetAuthUser } from '@modules/auth'
import { getTokens, saveTokens } from '@utils/tokens'

export const parseLoggedInUser = async () => {
	const { accessToken, refreshToken } = await getTokens()

	if (accessToken && refreshToken) {
		const user = await GetAuthUser.call().catch(() => null)
		if (user) {
			await useAuth().setAuthUser(user)
			// TODO: if (user && !user.isVerified) await redirect('/auth/verify')
		} else {
			await saveTokens({ accessToken: null, refreshToken: null })
		}
	}
}
