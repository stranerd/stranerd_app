import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Ref, ref, watch } from 'vue'
import { ProfileUpdateFactory, UpdateProfile } from '@modules/auth'
import { useAuth } from '@app/composable/auth/auth'
import { TutorUpdateFactory, UpdateTutor } from '@modules/users'

export const useProfileUpdate = () => {
	const factory = ref(new ProfileUpdateFactory()) as Ref<ProfileUpdateFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const { user } = useAuth()

	if (user.value) factory.value.loadEntity(user.value)
	watch(() => user.value?.hash, () => user.value ? factory.value.loadEntity(user.value) : null)

	const updateProfile = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await UpdateProfile.call(factory.value)
				await setMessage('Profile updated successfully!')
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, updateProfile }
}

export const useTutorUpdate = () => {
	const factory = ref(new TutorUpdateFactory()) as Ref<TutorUpdateFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const { user } = useAuth()

	if (user.value) factory.value.loadEntity(user.value)
	watch(() => user.value?.hash, () => user.value ? factory.value.loadEntity(user.value) : null)

	const updateTutor = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await UpdateTutor.call(factory.value)
				await setMessage('Updated successfully!')
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, updateTutor }
}
