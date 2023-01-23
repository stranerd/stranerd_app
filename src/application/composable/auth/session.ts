import { AuthUseCases } from '@modules/auth'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'
import { Router, useRoute, useRouter } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { Alert } from '@utils/dialog'
import { storage } from '@utils/storage'
import { setEmailVerificationEmail } from '@app/composable/auth/signin'

const SCHOOL_STATE_KEY = 'onboarding_school_show_key'
export const getSchoolState = async () => storage.get(SCHOOL_STATE_KEY)
export const saveSchoolState = async () => storage.set(SCHOOL_STATE_KEY, useAuth().id.value)

export const createSession = async (afterAuth: AfterAuthUser, router: Router) => {
	if (!afterAuth.user.isVerified) {
		setEmailVerificationEmail(afterAuth.user.email)
		return await router.push('/auth/verify')
	}
	await AuthUseCases.sessionSignin(afterAuth)
	const { setAuthUser, signin } = useAuth()
	await setAuthUser(afterAuth.user)
	const successful = await signin(false, router)
	if (successful) {
		const redirect = await storage.get(REDIRECT_SESSION_NAME)
		if (redirect) await storage.remove(REDIRECT_SESSION_NAME)
		await router.push(redirect ?? '/dashboard')
	}
}

export const useSessionSignout = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signout = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to sign out?',
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

export const useDeleteAccount = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const deleteAccount = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to delete your account? This action is not reversible',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await useAuth().deleteAccount()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteAccount }
}

export const useRedirectToAuth = () => {
	const route = useRoute()
	const router = useRouter()

	const redirect = async () => {
		await storage.set(REDIRECT_SESSION_NAME, route.fullPath)
		if (router) await router.push('/auth/signin')
	}

	return { redirect }
}
