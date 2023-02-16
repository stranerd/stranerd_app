import { useAuth } from '@app/composable/auth/auth'
import { useUserModal } from '@app/composable/core/modals'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { createTransaction } from '@app/composable/payment/transactions'
import { Bank, MethodsUseCases, TransactionType, WalletAccountFactory, WalletsUseCases } from '@modules/payment'
import { Alert } from '@utils/dialog'
import { storage } from '@utils/storage'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const AFTER_SUB_ROUTE_KEY = 'AFTER_SUBSCRIPTION_ROUTE_KEY'

export const saveRouteForAfterSub = async (route: string) => {
	await storage.set(AFTER_SUB_ROUTE_KEY, route)
}

const subscribe = async (planId: string): ReturnType<typeof WalletsUseCases.subscribeToPlan> => {
	const primaryMethod = await MethodsUseCases.getPrimary()
	if (primaryMethod) return await WalletsUseCases.subscribeToPlan(planId)
	else {
		const res = await createTransaction(TransactionType.NewCard, 'A test amount will be charged and added to your wallet to see if the card works fine')
		if (res) return await subscribe(planId)
		else throw new Error('Failed to capture your payment details')
	}
}

export const useWallet = () => {
	const { wallet } = useAuth()
	const router = useRouter()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { message, setMessage } = useSuccessHandler()

	const subscribeToPlan = async (planId: string) => {
		await setError('')
		try {
			await setLoading(true)
			wallet.value = await subscribe(planId)
			await setMessage('Subscribed successfully!')
			useUserModal().closeSubscriptionDetails()
			const route = await storage.get(AFTER_SUB_ROUTE_KEY)
			await storage.remove(AFTER_SUB_ROUTE_KEY)
			if (route) await router.push(route)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}

	const cancelSubscription = async () => {
		await setError('')
		if (wallet.value && !wallet.value?.subscription.next) return
		const res = await Alert({
			message: 'Are you sure you want to cancel your current subscription?',
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
	const factory = new WalletAccountFactory()
	factory.loadEntity(wallet.value!)
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { message, setMessage } = useSuccessHandler()

	const updateAccount = async () => {
		let res = false
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				wallet.value = await WalletsUseCases.updateAccount(factory)
				await setMessage('Account updated successfully')
				factory.reset()
				res = true
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
		return res
	}

	const fetchBanks = async () => {
		banks.value = await WalletsUseCases.getBanks(factory.country)
	}

	watch(() => factory.country, fetchBanks)
	watch(wallet, () => factory.loadEntity(wallet.value!))
	onMounted(fetchBanks)

	return { error, loading, message, wallet, factory, banks, updateAccount }
}
