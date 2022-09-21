import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthUseCases, PasswordResetFactory, PasswordUpdateFactory } from '@modules/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { createSession } from '@app/composable/auth/session'
import { NetworkError, StatusCodes } from '@modules/core'

export const usePasswordReset = () => {
	const sent = ref(false)
	const router = useRouter()
	const factory = ref(new PasswordResetFactory()) as Ref<PasswordResetFactory>
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const sendResetEmail = async () => {
		await setError('')
		if (factory.value.isValid('email') && !loading.value) {
			const email = factory.value.email
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
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const user = await AuthUseCases.resetPassword(factory.value)
				await setMessage('Password reset successfully!')
				await createSession(user, router)
			} catch (error) {
				if (error instanceof NetworkError && error.statusCode === StatusCodes.InvalidToken) {
					await setError('Invalid or expired OTP. Resend a new OTP sent to your email')
				} else await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}
	return { factory, sent, loading, message, error, resetPassword, sendResetEmail }
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
				await AuthUseCases.updatePassword(factory.value)
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
