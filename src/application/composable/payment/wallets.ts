import { onMounted, onUnmounted, ref } from 'vue'
import { WalletEntity, WalletsUseCases } from '@modules/payment'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'

const global = {
	wallet: ref(null as WalletEntity | null),
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const setWallet = async (entity: WalletEntity) => {
	global.wallet.value = entity
}
const listener = useListener(async () => await WalletsUseCases.listen({
	created: setWallet,
	updated: setWallet,
	deleted: setWallet
}))

export const useWallet = () => {
	const fetchWallet = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			await setWallet(await WalletsUseCases.get())
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchWallet()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global }
}
