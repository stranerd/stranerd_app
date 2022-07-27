import { onMounted, onUnmounted, ref } from 'vue'
import { WalletEntity, WalletsUseCases } from '@modules/payment'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'

const global = {
	wallet: ref(null as WalletEntity | null),
	fetched: ref(false),
	...useErrorHandler(),
	...useSuccessHandler(),
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

	const subscribeToPlan = async (subscriptionId: string) => {
		await global.setError('')
		if (global.wallet.value?.currentSubscriptionId === subscriptionId) return
		const res = await Alert({
			title: 'Are you sure you want to subscribe to this plan?',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		})
		if (!res) return
		try {
			await global.setLoading(true)
			global.wallet.value = await WalletsUseCases.subscribeToPlan(subscriptionId)
			await global.setMessage('Subscribed successfully!')
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	const renewSubscription = async () => {
		await global.setError('')
		if (global.wallet.value?.currentSubscriptionId && global.wallet.value?.subscription.active) return
		const res = await Alert({
			title: 'Are you sure you want to renew your current plan?',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		})
		if (!res) return
		try {
			await global.setLoading(true)
			global.wallet.value = await WalletsUseCases.cancelSubscription()
			await global.setMessage('Renewal successfully!')
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	const cancelSubscription = async () => {
		await global.setError('')
		if (global.wallet.value && !global.wallet.value?.currentSubscriptionId) return
		const res = await Alert({
			title: 'Are you sure you want to cancel your current plan?',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		})
		if (!res) return
		try {
			await global.setLoading(true)
			global.wallet.value = await WalletsUseCases.cancelSubscription()
			await global.setMessage('Cancelled successfully!')
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	return { ...global, subscribeToPlan, renewSubscription, cancelSubscription }
}
