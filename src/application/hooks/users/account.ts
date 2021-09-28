import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/hooks/core/states'
import { Ref, ref, useRouter, watch } from '@nuxtjs/composition-api'
import { ProfileUpdateFactory, UpdateProfile } from '@modules/auth'
import { useAuth } from '@app/hooks/auth/auth'
import { useAccountModal, usePaymentModal } from '@app/hooks/core/modals'
import { setPaymentProps } from '@app/hooks/payment/payment'
import { analytics } from '@modules/core'

export const useUpdateProfile = () => {
	const router = useRouter()
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
				await router.push('/account/')
				await setMessage('Profile updated successfully!')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		error, loading,
		factory,
		updateProfile
	}
}

const BRONZE_PRICES = [
	{ amount: 300, price: 0.99, src: '/images/buyCoins/bronze-1.svg' },
	{ amount: 500, price: 1.99, src: '/images/buyCoins/bronze-2.svg' }
]
const GOLD_PRICES = [
	{ amount: 10, price: 0.99, src: '/images/buyCoins/gold-1.svg' },
	{ amount: 50, price: 4.99, src: '/images/buyCoins/gold-2.svg' }
]

export const useBuyCoins = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()

	const buyCoins = async (option: typeof BRONZE_PRICES[0], isGold: boolean) => {
		setPaymentProps({
			type: 'buyCoins',
			amount: option.price,
			data: { gold: isGold ? option.amount : 0, bronze: isGold ? 0 : option.amount },
			afterPayment: async (res: boolean) => {
				if (res && !loading.value) {
					try {
						await setLoading(true)
						useAccountModal().closeBuyCoins()
						analytics.logEvent('buy_coins_end', {
							amount: option.amount,
							price: option.price,
							isGold
						})
						await setMessage('Coins purchased successfully')
					} catch (e) {
						await setError(e)
					}
					await setLoading(false)
				}
			}
		})
		usePaymentModal().openMakePayment()
	}

	return {
		loading, error, message, buyCoins,
		BRONZE_PRICES, GOLD_PRICES
	}
}
