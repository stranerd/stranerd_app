import { useAuth } from '@app/composable/auth/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { AuthUseCases, PhoneUpdateFactory, ProfileUpdateFactory } from '@modules/auth'
import { UsersUseCases } from '@modules/users'
import { UserSchoolFactory } from '@modules/users/domain/factories/userSchool'
import { ref, watch } from 'vue'

export const useProfileUpdate = () => {
	const factory = new ProfileUpdateFactory()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const { user } = useAuth()

	if (user.value) factory.loadEntity(user.value)
	watch(user, () => user.value && factory.loadEntity(user.value))

	const updateProfile = async (skipAlert = false) => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				await AuthUseCases.updateProfile(factory)
				await setMessage('Profile updated successfully!', skipAlert)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { error, loading, factory, updateProfile }
}

export const useUserSchoolUpdate = () => {
	const factory = new UserSchoolFactory()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const { user } = useAuth()

	if (user.value) factory.loadEntity(user.value)
	watch(user, () => user.value && factory.loadEntity(user.value))

	const updateSchool = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				await UsersUseCases.updateSchool(factory)
				await setMessage('Updated successfully!')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { error, loading, factory, updateSchool }
}

export const usePhoneUpdate = () => {
	const factory = new PhoneUpdateFactory()
	const sent = ref(false)
	const token = ref('')
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { message, setMessage } = useSuccessHandler()
	const { user } = useAuth()

	if (user.value) factory.loadEntity(user.value)
	watch(user, () => user.value && factory.loadEntity(user.value))
	const completeVerification = async () => {
		if (loading.value) return
		await setError('')
		await setLoading(true)
		try {
			await AuthUseCases.completePhoneVerification(token.value)
			await setMessage('Phone number updated successfully!')
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const sendVerificationText = async () => {
		if (!factory.valid) return
		if (loading.value) return
		await setError('')
		await setLoading(true)
		try {
			await AuthUseCases.sendVerificationText(factory)
			await setMessage('An OTP was just sent to your number.')
			sent.value = true
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}

	return {
		token, sent, factory, loading, error, message,
		sendVerificationText, completeVerification
	}
}
