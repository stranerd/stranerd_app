import { BuyCoinsWithStripe, VerifyStripePayment } from '@/modules/meta'
import { useErrorHandler, useLoadingHandler } from '@/application/composable/core/states'
import { stripeConfig } from '@/utils/environment'
import { analytics } from '@/modules/core'
import { loadStripe } from '@stripe/stripe-js'
import { useAuth } from '@/application/composable/auth/auth'


type RawPaymentProps = {
	afterPayment: null | ((res: boolean) => Promise<void>);
	amount: number | null;
}

type PaymentData = {
	type: 'buyCoins';
	data: { gold: number; bronze: number };
} | {
	type: null;
	data: {};
}


let props: RawPaymentProps & PaymentData = {
	type: null,
	amount: null,
	afterPayment: null,
	data: {} as Record<string, any>
}
export const setPaymentProps = (prop: typeof props) => props = prop

export const useFlutterwavePayment = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const pay = async (successful: boolean) => {
		await setError('')
		await setLoading(true)
		try {
			// usePaymentModal().closeMakePayment()
			await props.afterPayment?.(successful)
			await analytics.logEvent('purchase', {
				value: props.amount!
			})
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	return { error, loading, pay, amount: props.amount }
}

export const useStripePayment = () => {
	const { getLocalAmount, getLocalCurrency } = useAuth()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const pay = async (token: string) => {
		await setError('')
		await setLoading(true)
		try {
			const stripe = await loadStripe(stripeConfig.publicKey)
			if (!stripe) return await setLoading(false)
			if (props.type === 'buyCoins') {
				const { id, clientSecret } = await BuyCoinsWithStripe.call(
					getLocalAmount(props.amount!),
					getLocalCurrency(),
					{ gold: props.data.gold, bronze: props.data.bronze }
				)
				const intent = await stripe.confirmCardPayment(clientSecret, {
					payment_method: {
						card: { token }
					}
				})
				if (intent.error) throw new Error(intent.error.message)
				const succeeded = await VerifyStripePayment.call(id)
				await props.afterPayment?.(succeeded)
			}
			// usePaymentModal().closeMakePayment()
			await analytics.logEvent('purchase', {
				value: props.amount!
			})
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	return { error, loading, pay, setLoading }
}
