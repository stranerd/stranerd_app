import { createSession } from '@app/composable/auth/session'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { AuthUseCases, PasswordResetFactory, PasswordUpdateFactory } from '@modules/auth'
import { NetworkError, StatusCodes } from '@modules/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const usePasswordReset = () => {
	const sent = ref(false)
	const router = useRouter()
	const factory = new PasswordResetFactory()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const sendResetEmail = async () => {
		await setError('')
		if (factory.isValid('email') && !loading.value) {
			const email = factory.email
			await setLoading(true)
			try {
				await AuthUseCases.sendPasswordResetEmail(email)
				await setMessage(`An OTP was just sent to ${email}`)
				sent.value = true
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	const resetPassword = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			await setLoading(true)
			try {
				const user = await AuthUseCases.resetPassword(factory)
				await setMessage('Password reset successfully!')
				await createSession(user, router)
			} catch (error) {
				if (error instanceof NetworkError && error.statusCode === StatusCodes.InvalidToken) {
					await setError('Invalid or expired OTP. Resend a new OTP sent to your email')
				} else await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}
	return { factory, sent, loading, message, error, resetPassword, sendResetEmail }
}

export const usePasswordUpdate = () => {
	const factory = new PasswordUpdateFactory()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const updatePassword = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				await AuthUseCases.updatePassword(factory)
				await setMessage('Password updated successfully!')
				factory.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { error, loading, factory, updatePassword }
}
