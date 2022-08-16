import { Bank, CardsUseCases, WalletAccountFactory, WalletsUseCases } from '@modules/payment'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useAuth } from '@app/composable/auth/auth'
import { useRouter } from 'vue-router'
import { onMounted, Ref, ref, watch } from 'vue'

export const useWallet = () => {
	const { wallet } = useAuth()
	const router = useRouter()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { message, setMessage } = useSuccessHandler()

	const subscribeToPlan = async (subscriptionId: string) => {
		await setError('')
		if (wallet.value?.subscription.active) return
		const res = await Alert({
			title: 'Are you sure you want to subscribe to this plan?',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		})
		if (!res) return
		try {
			await setLoading(true)
			const primaryCard = await CardsUseCases.getPrimary()
			if (primaryCard) {
				wallet.value = await WalletsUseCases.subscribeToPlan(subscriptionId)
				await setMessage('Subscribed successfully!')
			} else {
				await setError('You do not have a primary card. Add one!')
				await router.push('/settings/subscription/#cards')
			}
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}

	const cancelSubscription = async () => {
		await setError('')
		if (wallet.value && !wallet.value?.subscription.next) return
		const res = await Alert({
			title: 'Are you sure you want to cancel your current plan?',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		})
		if (!res) return
		try {
			await setLoading(true)
			wallet.value = await WalletsUseCases.cancelSubscription()
			await setMessage('Cancelled successfully!')
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}

	return { error, loading, message, subscribeToPlan, cancelSubscription }
}

export const useEditAccount = () => {
	const { wallet } = useAuth()
	const banks = ref([] as Bank[])
	const factory = ref(new WalletAccountFactory()) as Ref<WalletAccountFactory>
	factory.value.loadEntity(wallet.value!)
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { message, setMessage } = useSuccessHandler()

	const updateAccount = async () => {
		let res = false
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				wallet.value = await WalletsUseCases.updateAccount(factory.value)
				await setMessage('Account updated successfully')
				factory.value.reset()
				res = true
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
		return res
	}

	const fetchBanks = async () => {
		banks.value = await WalletsUseCases.getBanks(factory.value.country)
	}

	watch(() => factory.value.country, fetchBanks)
	watch(wallet, () => factory.value.loadEntity(wallet.value!))
	onMounted(fetchBanks)

	return { error, loading, message, wallet, factory, banks, updateAccount }
}
