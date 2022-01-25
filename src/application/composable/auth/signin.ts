import { onMounted, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
	CompleteEmailVerification,
	EmailSigninFactory,
	EmailSignupFactory,
	SendVerificationEmail,
	SigninWithEmail,
	SigninWithGoogle,
	SignupWithEmail
} from '@modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { createSession } from '@app/composable/auth/session'
import { NetworkError, StatusCodes } from '@modules/core'
import { useAuth } from '@app/composable/auth/auth'
import { storage } from '@utils/storage'

const global = {
	referrerId: ref(undefined as string | undefined),
	emailSignin: { ...useErrorHandler(), ...useLoadingHandler(), ...useSuccessHandler() },
	emailSignup: { ...useErrorHandler(), ...useLoadingHandler(), ...useSuccessHandler() },
	googleSignin: { ...useErrorHandler(), ...useLoadingHandler(), ...useSuccessHandler() },
	emailVerificationRequest: { email: ref(null as string | null), ...useErrorHandler(), ...useLoadingHandler(), ...useSuccessHandler() },
	emailVerificationComplete: { ...useErrorHandler(), ...useLoadingHandler(), ...useSuccessHandler() }
}

export const getReferrerId = async () => await storage.get('referrer') ?? global.referrerId.value

export const setReferrerId = async (id: string) => {
	global.referrerId.value = id
	await storage.set('referrer', id)
}
export const saveReferrerId = async () => {
	const id = getReferrerId()
	if (id) await storage.set('referrer', id)
}

export const useEmailSignin = () => {
	const router = useRouter()
	const factory = ref(new EmailSigninFactory()) as Ref<EmailSigninFactory>
	const { error, loading, setError, setLoading } = global.emailSignin
	const signin = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const user = await SigninWithEmail.call(factory.value, {
					referrer: await getReferrerId()
				})
				await createSession(user, router)
				await storage.remove('referrer')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, error, signin }
}

export const useEmailSignup = () => {
	const router = useRouter()
	const factory = ref(new EmailSignupFactory()) as Ref<EmailSignupFactory>
	const { error, loading, setError, setLoading } = global.emailSignup
	const signup = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const user = await SignupWithEmail.call(factory.value, {
					referrer: await getReferrerId()
				})
				await createSession(user, router)
				await storage.remove('referrer')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, error, signup }
}

export const useCompleteEmailVerification = (token: string) => {
	const router = useRouter()
	const { error, loading, setError, setLoading } = global.emailVerificationComplete
	const completeVerification = async () => {
		await setError('')
		await setLoading(true)
		try {
			const user = await CompleteEmailVerification.call(token)
			await createSession(user, router)
		} catch (error) {
			await setError(error)
			if (error instanceof NetworkError && error.statusCode === StatusCodes.InvalidToken) {
				await setError('Invalid or expired token. Proceed to signin!')
				await router.replace('/auth/signin')
			} else await setError(error)
		}
		await setLoading(false)
	}
	onMounted(completeVerification)
	return { loading, error, completeVerification }
}

export const setEmailVerificationEmail = (email: string) => global.emailVerificationRequest.email.value = email
export const getEmailVerificationEmail = () => global.emailVerificationRequest.email.value

export const useEmailVerificationRequest = () => {
	const { error, loading, message, setError, setLoading, setMessage } = global.emailVerificationRequest

	const sendVerificationEmail = async () => {
		const email = global.emailVerificationRequest.email.value
		if (!email) return
		await setError('')
		await setLoading(true)
		try {
			await SendVerificationEmail.call(email)
			await setMessage(`A verification email was just sent to ${email}. Proceed to your email to complete your verification.`)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	onMounted(sendVerificationEmail)

	return {
		email: useAuth().auth.value?.email,
		loading, error, message,
		sendVerificationEmail
	}
}

export const useGoogleSignin = () => {
	const router = useRouter()
	const { error, loading, setError, setLoading } = global.emailVerificationRequest
	const signin = async (idToken: string) => {
		await setError('')
		if (!loading.value) {
			await setLoading(true)
			try {
				const user = await SigninWithGoogle.call(idToken, {
					referrer: await getReferrerId()
				})
				await createSession(user, router)
				await storage.remove('referrer')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}
	return { loading, error, signin, setError }
}
