import { CardsUseCases, WalletsUseCases } from '@modules/payment'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useAuth } from '@app/composable/auth/auth'
import { useRouter } from 'vue-router'

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
