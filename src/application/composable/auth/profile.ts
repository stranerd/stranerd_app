import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Ref, ref, watch } from 'vue'
import { AuthUseCases, PhoneUpdateFactory, ProfileUpdateFactory } from '@modules/auth'
import { useAuth } from '@app/composable/auth/auth'
import { UserSchoolFactory } from '@modules/users/domain/factories/userSchool'
import { UsersUseCases } from '@modules/users'

export const useProfileUpdate = () => {
	const factory = ref(new ProfileUpdateFactory()) as Ref<ProfileUpdateFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const { user } = useAuth()

	if (user.value) factory.value.loadEntity(user.value)
	watch(user, () => user.value && factory.value.loadEntity(user.value))

	const updateProfile = async (skipAlert = false) => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AuthUseCases.updateProfile(factory.value)
				await setMessage('Profile updated successfully!', skipAlert)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, updateProfile }
}

export const useUserSchoolUpdate = () => {
	const factory = ref(new UserSchoolFactory()) as Ref<UserSchoolFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const { user } = useAuth()

	if (user.value) factory.value.loadEntity(user.value)
	watch(user, () => user.value && factory.value.loadEntity(user.value))

	const updateSchool = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await UsersUseCases.updateSchool(factory.value)
				await setMessage('Updated successfully!')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, updateSchool }
}

export const usePhoneUpdate = () => {
	const factory = ref(new PhoneUpdateFactory()) as Ref<PhoneUpdateFactory>
	const sent = ref(false)
	const token = ref('')
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { message, setMessage } = useSuccessHandler()
	const { user } = useAuth()

	if (user.value) factory.value.loadEntity(user.value)
	watch(user, () => user.value && factory.value.loadEntity(user.value))
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
		if (!factory.value.valid) return
		if (loading.value) return
		await setError('')
		await setLoading(true)
		try {
			await AuthUseCases.sendVerificationText(factory.value)
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
