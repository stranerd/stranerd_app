import { SessionSignin } from '@/modules/auth'
import { useErrorHandler, useLoadingHandler } from '@/application/hooks/core/states'
import { isServer } from '@/utils/environment'
import { REDIRECT_SESSION_NAME } from '@/utils/constants'
import { AfterAuthUser } from '@/modules/auth/domain/entities/auth'
import { useContext } from 'vue'
import { VueRouter } from 'vue-router'
import { useAuth } from '@/application/hooks/auth/auth'
import { Alert } from '@/application/hooks/core/notifications'
import { parseCookie, serializeToCookie } from '@/utils/cookie'

export const createSession = async (afterAuth: AfterAuthUser, router: VueRouter) => {
	if (!afterAuth.user.isVerified) {
		await useAuth().setAuthUser(afterAuth.user)
		return await router.push('/auth/verify')
	}
	await SessionSignin.call(afterAuth)
	const { setAuthUser, signin, setTokens } = useAuth()
	await setTokens({ accessToken: afterAuth.accessToken, refreshToken: afterAuth.refreshToken })
	await setAuthUser(afterAuth.user)
	await signin(false)

	const { [REDIRECT_SESSION_NAME]: redirect } = parseCookie(document.cookie ?? '')
	document.cookie = serializeToCookie(REDIRECT_SESSION_NAME, '', -1)
	await window.location.assign(redirect ?? '/dashboard')
}

export const useSessionSignout = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signout = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to sign out?',
			text: '',
			icon: 'info',
			confirmButtonText: 'Yes, signout'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await useAuth().signout()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, signout }
}

export const useRedirectToAuth = () => {
	const { app, res, route } = useContext()

	const redirect = () => {
		if (isServer()) res.setHeader('Set-Cookie', serializeToCookie(REDIRECT_SESSION_NAME, route.value.fullPath))
		else document.cookie = serializeToCookie(REDIRECT_SESSION_NAME, route.value.fullPath)
		if (app.router) app.router.push('/auth/signin')
	}

	return { redirect }
}
