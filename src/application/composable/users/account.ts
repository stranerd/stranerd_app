import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { setPaymentProps } from '@app/composable/payment/payment'
import { analytics } from '@modules/core'

const BRONZE_PRICES = [
	{ amount: 200, price: 0.99, src: '/images/buyCoins/bronze-1.svg' },
	{ amount: 400, price: 1.99, src: '/images/buyCoins/bronze-2.svg' }
]
const GOLD_PRICES = [
	{ amount: 10, price: 0.99, src: '/images/buyCoins/gold-1.svg' },
	{ amount: 20, price: 1.99, src: '/images/buyCoins/gold-2.svg' }
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
						//useAccountModal().closeBuyCoins()
						await analytics.logEvent('buy_coins_end', {
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
		//usePaymentModal().openMakePayment()
	}

	return {
		loading, error, message, buyCoins,
		BRONZE_PRICES, GOLD_PRICES
	}
}
