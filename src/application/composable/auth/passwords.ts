import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
	PasswordResetFactory,
	PasswordResetRequestFactory,
	PasswordUpdateFactory,
	ResetPassword,
	SendPasswordResetEmail,
	UpdatePassword
} from '@modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { createSession } from '@app/composable/auth/session'
import { NetworkError, StatusCodes } from '@modules/core'

export const usePasswordResetRequest = () => {
	const factory = ref(new PasswordResetRequestFactory()) as Ref<PasswordResetRequestFactory>
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const sendResetEmail = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				await SendPasswordResetEmail.call(factory.value)
				factory.value.reset()
				await setMessage('Proceed to your email to continue')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, message, error, sendResetEmail }
}

export const usePasswordReset = (token: string) => {
	const router = useRouter()
	const factory = ref(new PasswordResetFactory()) as Ref<PasswordResetFactory>
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const resetPassword = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const user = await ResetPassword.call(token, factory.value)
				await setMessage('Password reset successfully!')
				await createSession(user, router)
			} catch (error) {
				if (error instanceof NetworkError && error.statusCode === StatusCodes.InvalidToken) {
					await setError('Invalid or expired token. Request a new link sent to your email')
					await router.replace('/auth/forgot')
				} else await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, loading, message, error, resetPassword }
}

export const usePasswordUpdate = () => {
	const factory = ref(new PasswordUpdateFactory()) as Ref<PasswordUpdateFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const updatePassword = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await UpdatePassword.call(factory.value)
				await setMessage('Password updated successfully!')
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, updatePassword }
}
