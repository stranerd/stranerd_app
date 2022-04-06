import { Ref, ref, watch } from 'vue'
import { AddMessage, MessageFactory } from '@modules/meta'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'

export const useCreateMessage = () => {
	const { user } = useAuth()
	const factory = ref(new MessageFactory()) as Ref<MessageFactory>
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	if (user.value) {
		factory.value.firstName = user.value.bio.firstName
		factory.value.lastName = user.value.bio.lastName
		factory.value.email = user.value.bio.email
	}

	watch(() => user.value?.bio, () => {
		if (user.value) {
			factory.value.firstName = user.value.bio.firstName
			factory.value.lastName = user.value.bio.lastName
			factory.value.email = user.value.bio.email
		}
	})

	const createMessage = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AddMessage.call(factory.value)
				factory.value.reset()
				await setMessage('Message sent successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, message,
		createMessage
	}
}
