import { useAuth } from '@/application/composable/auth/auth'
import { GetAuthUser } from '@/modules/auth'
import { saveTokens } from '@/utils/tokens'

export const setAuthUser =  async () => {

	 const accessToken = localStorage.getItem('accessToken')
	 const refreshToken = localStorage.getItem('refreshToken')
	  
	if (accessToken && refreshToken) {
		await saveTokens({ accessToken, refreshToken })
		const user = await GetAuthUser.call().catch(() => null)
		if (user) {
			await useAuth().setAuthUser(user)
			// if (user && !user.isVerified) await redirect('/auth/verify')
		} else {
			await saveTokens({ accessToken: null, refreshToken: null })
		}
	}
}
