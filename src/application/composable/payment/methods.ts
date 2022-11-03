import { onMounted, onUnmounted, ref } from 'vue'
import { MethodEntity, MethodsUseCases } from '@modules/payment'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'
import { Alert } from '@utils/dialog'

const global = {
	methods: ref([] as MethodEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => await MethodsUseCases.listen({
	created: async (entity) => {
		addToArray(global.methods.value, entity, (e) => e.id, (e) => e.createdAt, true)
	},
	updated: async (entity) => {
		addToArray(global.methods.value, entity, (e) => e.id, (e) => e.createdAt, true)
	},
	deleted: async (entity) => {
		const index = global.methods.value.findIndex((q) => q.id === entity.id)
		if (index !== -1) global.methods.value.splice(index, 1)
	}
}))

export const useMethodsList = () => {
	const fetchMethods = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const methods = await MethodsUseCases.get()
			methods.results.forEach((q) => addToArray(global.methods.value, q, (e) => e.id, (e) => e.createdAt, true))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchMethods()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global }
}

export const useMethod = (method: MethodEntity) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()

	const makeMethodPrimary = async () => {
		await setError('')
		if (method.primary) return
		const res = await Alert({
			message: 'Do you want this method as your default for payments and subscriptions?',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		})
		if (!res) return
		try {
			await setLoading(true)
			method = await MethodsUseCases.makePrimary(method.id)
			await setMessage('Method now primary')
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	const deleteMethod = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to delete this method?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await MethodsUseCases.delete(method.id)
				global.methods.value = global.methods.value.filter((c) => c.id !== method.id)
				await setMessage('Method deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, message, makeMethodPrimary, deleteMethod }
}
