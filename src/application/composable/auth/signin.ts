import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
	CompleteEmailVerification,
	EmailSigninFactory,
	EmailSignupFactory,
	SendVerificationEmail,
	SigninWithEmail,
	SigninWithGoogle,
	SignupWithEmail
} from '@/modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@/application/composable/core/states'
import { isClient } from '@/utils/environment'
import { NetworkError, StatusCodes } from '@/modules/core'
import { useAuth } from '@/application/composable/auth/auth'
import { createStorage } from './storage'

const global = {
	referrerId: ref(undefined as string | undefined)
}


export const getReferrerId = () => isClient()
	? (window.localStorage.getItem('referrer') ?? global.referrerId.value)
	: global.referrerId.value

export const useGoogleSignin = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signin = async (idToken: string) => {
		await setError('')
		if (!loading.value) {
			await setLoading(true)
			try {
				const user = await SigninWithGoogle.call(idToken, {
					referrer: getReferrerId()
				})
				await createStorage(user)
				if (isClient()) window.localStorage.removeItem('referrer')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}
	return { loading, error, signin, setError }
}

export const useEmailSignin = () => {
	const router = useRouter()
	const factory = ref(new EmailSigninFactory()) as Ref<EmailSigninFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signin = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const user = await SigninWithEmail.call(factory.value, {
					referrer: getReferrerId()
				})
				await createStorage(user)
				await  router.push(`/dashboard/home`)
				window.localStorage.removeItem('referrer')

			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, error, signin }
}

export const useEmailSignup = () => {
	
	const factory = ref(new EmailSignupFactory()) as Ref<EmailSignupFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signup = async () => {
		await setError('')
	
		if (!factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const user = await SignupWithEmail.call(factory.value, {
					referrer: getReferrerId()
				})
				await createStorage(user)
				if (isClient()) window.localStorage.removeItem('referrer')
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
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const completeVerification = async () => {
		await setError('')
		await setLoading(true)
		try {
			const user = await CompleteEmailVerification.call(token)
			await createStorage(user)
		} catch (error) {
			await setError(error)
			if (error instanceof NetworkError && error.statusCode === StatusCodes.InvalidToken) {
				await setError('Invalid or expired token. Proceed to signin!')
				await router.replace('/auth/signin')
			} else await setError(error)
		}
		await setLoading(false)
	}
	return { loading, error, completeVerification }
}

export const useEmailVerificationRequest = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()

	const sendVerificationEmail = async () => {
		const email = useAuth().auth.value?.email
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

	return {
		email: useAuth().auth.value?.email,
		loading, error, message,
		sendVerificationEmail
	}
}

export const setReferrerId = (id: string) => {
	global.referrerId.value = id
	if (isClient()) window.localStorage.setItem('referrer', id)
}
export const saveReferrerId = () => {
	const id = getReferrerId()
	if (id && isClient()) window.localStorage.setItem('referrer', id)
}

