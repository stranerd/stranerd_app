import { Directive, Ref, ref } from 'vue'
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
import { googleClientId } from '@utils/environment'
import { useAuth } from '@app/composable/auth/auth'

const global = {
	referrerId: ref(undefined as string | undefined)
}

export const getReferrerId = () => window.localStorage.getItem('referrer') ?? global.referrerId.value

export const setReferrerId = (id: string) => {
	global.referrerId.value = id
	window.localStorage.setItem('referrer', id)
}
export const saveReferrerId = () => {
	const id = getReferrerId()
	if (id) window.localStorage.setItem('referrer', id)
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
				await createSession(user, router)
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
	const router = useRouter()
	const factory = ref(new EmailSignupFactory()) as Ref<EmailSignupFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signup = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const user = await SignupWithEmail.call(factory.value, {
					referrer: getReferrerId()
				})
				await createSession(user, router)
				window.localStorage.removeItem('referrer')
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

export const useGoogleSignin = () => {
	const router = useRouter()
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
				await createSession(user, router)
				window.localStorage.removeItem('referrer')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}
	return { loading, error, signin, setError }
}

export const GoogleAuth: Directive = {
	beforeMount (el: Element) {
		const { setError, signin } = useGoogleSignin()
		const googleSignInAPI = document.createElement('script')
		googleSignInAPI.setAttribute('src', 'https://apis.google.com/js/api:client.js')
		document.head.appendChild(googleSignInAPI)
		const onSuccess = async (googleUser: any) => {
			await signin(googleUser.getAuthResponse().id_token)
			googleUser.disconnect()
		}
		const onFail = async () => {
			await setError('Error signing in with google')
		}

		googleSignInAPI.onload = () => {
			//@ts-ignore
			gapi.load('auth2', () => {
				//@ts-ignore
				const auth2 = gapi.auth2.init({
					client_id: googleClientId,
					cookiepolicy: 'single_host_origin'
				})
				auth2.attachClickHandler(el, {}, onSuccess, onFail)
			})
		}
	}
}
