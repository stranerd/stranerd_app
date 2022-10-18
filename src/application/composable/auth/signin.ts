import { onMounted, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthUseCases, EmailSigninFactory, EmailSignupFactory } from '@modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { createSession } from '@app/composable/auth/session'
import { NetworkError, StatusCodes } from '@modules/core'
import { storage } from '@utils/storage'
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { googleClientId, packageName } from '@utils/environment'
import { SignInWithApple } from '@capacitor-community/apple-sign-in'
import { isWeb } from '@utils/constants'

const global = {
	referrerId: ref(undefined as string | undefined),
	emailSignin: { ...useErrorHandler(), ...useLoadingHandler(), ...useSuccessHandler() },
	emailSignup: { ...useErrorHandler(), ...useLoadingHandler(), ...useSuccessHandler() },
	googleSignin: { ...useErrorHandler(), ...useLoadingHandler(), ...useSuccessHandler() },
	appleSignin: { ...useErrorHandler(), ...useLoadingHandler(), ...useSuccessHandler() },
	emailVerification: { email: ref(''), ...useErrorHandler(), ...useLoadingHandler(), ...useSuccessHandler() }
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
				const user = await AuthUseCases.signinWithEmail(factory.value, {
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
				const user = await AuthUseCases.signupWithEmail(factory.value, { referrer: await getReferrerId() })
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

export const useEmailVerification = () => {
	const router = useRouter()
	const sent = ref(false)
	const token = ref('')
	const { email, error, loading, message, setError, setLoading, setMessage } = global.emailVerification
	const completeVerification = async () => {
		await setError('')
		await setLoading(true)
		try {
			const user = await AuthUseCases.completeEmailVerification(token.value)
			await createSession(user, router)
		} catch (error) {
			await setError(error)
			if (error instanceof NetworkError && error.statusCode === StatusCodes.InvalidToken) {
				await setError('Invalid or expired token. Proceed to signin!')
				await router.push('/auth/signin')
			} else await setError(error)
		}
		await setLoading(false)
	}
	const sendVerificationEmail = async () => {
		if (!email.value) return
		await setError('')
		await setLoading(true)
		try {
			await AuthUseCases.sendVerificationEmail(email.value)
			await setMessage(`An OTP was just sent to ${email.value}.`)
			sent.value = true
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	onMounted(sendVerificationEmail)

	return {
		token, sent, email, loading, error, message,
		sendVerificationEmail, completeVerification
	}
}

export const setEmailVerificationEmail = (email: string) => global.emailVerification.email.value = email
export const getEmailVerificationEmail = () => global.emailVerification.email.value

export const useGoogleSignin = () => {
	const router = useRouter()
	const { error, loading, setError, setLoading } = global.googleSignin
	const signin = async () => {
		await setError('')
		if (!loading.value) {
			await setLoading(true)
			try {
				const googleUser = await GoogleAuth.signIn()
				const { accessToken, idToken } = googleUser.authentication
				await GoogleAuth.signOut()
				const user = await AuthUseCases.signinWithGoogle(
					{ accessToken, idToken },
					{ referrer: await getReferrerId() })
				await createSession(user, router)
				await storage.remove('referrer')
			} catch (error) {
				await setError(error ?? 'Error signing in with google')
			}
			await setLoading(false)
		}
	}

	onMounted(async () => {
		try {
			GoogleAuth.initialize({
				clientId: googleClientId,
				scopes: ['profile', 'email']
			})
		} catch (err) {
			await setError(err)
		}
	})

	return { loading, error, signin, setError }
}

export const useAppleSignin = () => {
	const router = useRouter()
	const { error, loading, setError, setLoading } = global.appleSignin
	const signin = async () => {
		await setError('')
		if (!loading.value) {
			await setLoading(true)
			try {
				const clientId = isWeb ? packageName.replace('.app', '') : packageName
				const redirectURI = 'https://' + clientId.split('.').reverse().join('.')
				const { response } = await SignInWithApple.authorize({
					clientId, redirectURI, scopes: 'name email'
				})
				const user = await AuthUseCases.signinWithApple({
					firstName: response.givenName,
					lastName: response.familyName,
					email: response.email,
					idToken: response.identityToken
				}, { referrer: await getReferrerId() })
				await createSession(user, router)
				await storage.remove('referrer')
			} catch (error) {
				await setError('Error signing in with apple')
			}
			await setLoading(false)
		}
	}
	return { loading, error, signin, setError }
}
