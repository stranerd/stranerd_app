import { SessionSignin } from '@modules/auth'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'
import { Router, useRoute, useRouter } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { Alert } from '@app/composable/core/notifications'
import { parseCookie, serializeToCookie } from '@utils/cookie'

export const createSession = async (afterAuth: AfterAuthUser, router: Router) => {
	if (!afterAuth.user.isVerified) {
		await useAuth().setAuthUser(afterAuth.user)
		return await router.push('/auth/verify')
	}
	await SessionSignin.call(afterAuth)
	const { setAuthUser, signin } = useAuth()
	await setAuthUser(afterAuth.user)
	await signin(false)

	const { [REDIRECT_SESSION_NAME]: redirect } = parseCookie(document.cookie ?? '')
	document.cookie = serializeToCookie(REDIRECT_SESSION_NAME, '', -1)
	await router.push(redirect ?? '/dashboard')
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
	const route = useRoute()
	const router = useRouter()

	const redirect = async () => {
		document.cookie = serializeToCookie(REDIRECT_SESSION_NAME, route.fullPath)
		if (router) await router.push('/auth/signin')
	}

	return { redirect }
}
