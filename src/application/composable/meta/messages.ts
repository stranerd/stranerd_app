import { useAuth } from '@app/composable/auth/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { HttpClient } from '@modules/core'
import { MessageFactory, MessagesUseCases } from '@modules/meta'
import { onMounted, ref, watch } from 'vue'

const store = {
	countries: ref([] as { name: string, independent: boolean }[]),
	fetched: ref(false)
}

export const useCreateMessage = () => {
	const { user } = useAuth()
	const factory = new MessageFactory()
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	if (user.value) {
		factory.firstName = user.value.bio.firstName
		factory.lastName = user.value.bio.lastName
		factory.email = user.value.bio.email
	}

	watch(() => user.value?.bio, () => {
		if (user.value) {
			factory.firstName = user.value.bio.firstName
			factory.lastName = user.value.bio.lastName
			factory.email = user.value.bio.email
		}
	})

	const createMessage = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				await MessagesUseCases.add(factory)
				factory.reset()
				await setMessage('Message sent successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	onMounted(async () => {
		if (store.fetched.value) return
		try {
			store.countries.value = await new HttpClient().get('https://restcountries.com/v2/all', { fields: 'name' })
			store.fetched.value = true
			// eslint-disable-next-line no-empty
		} catch (err) {
		}
	})

	return {
		...store,
		factory, error, loading, message,
		createMessage
	}
}
