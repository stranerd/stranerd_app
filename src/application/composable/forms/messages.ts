import { Ref, ref } from 'vue'
import { AddMessage, MessageFactory } from '@modules/meta'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'

export const useCreateMessage = () => {
	const factory = ref(new MessageFactory()) as Ref<MessageFactory>
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

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
