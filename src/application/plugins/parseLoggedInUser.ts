import { useAuth } from '@app/composable/auth/auth'
import { GetAuthUser } from '@modules/auth'
import { getTokens, saveTokens } from '@utils/tokens'
import { definePlugin } from '@app/plugins/index'

<<<<<<< HEAD
export const parseLoggedInUser = definePlugin(async () => {
=======
export const parseLoggedInUser = definePlugin(async ({ router }) => {
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	const { accessToken, refreshToken } = await getTokens()

	if (accessToken && refreshToken) {
		const user = await GetAuthUser.call().catch(() => null)
		if (user) {
			await useAuth().setAuthUser(user)
<<<<<<< HEAD
			// TODO: if (user && !user.isVerified) await redirect('/auth/verify')
=======
			if (user && !user.isVerified) await router.push('/auth/verify')
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
		} else {
			await saveTokens({ accessToken: null, refreshToken: null })
		}
	}
})
