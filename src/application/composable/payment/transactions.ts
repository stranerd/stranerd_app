import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { FlutterwaveSecrets, TransactionsUseCases, TransactionType } from '@modules/payment'
import { useScripts } from '@app/composable/core/scripts'
import { domain } from '@utils/environment'

const global = {
	flutterwave: null as FlutterwaveSecrets | null
}

export const useCreateTransaction = (type: TransactionType, description: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	useScripts('flutterwave', 'https://checkout.flutterwave.com/v3.js')

	const createTransaction = async () => {
		// @ts-ignore
		if (!window.FlutterwaveCheckout) return await setError('Cannot open flutterwave modal. Check your internet connection and reload')
		await setError('')
		if (!loading.value) {
			try {
				await setLoading(true)
				if (!global.flutterwave) global.flutterwave = await TransactionsUseCases.getFlutterwaveSecrets()
				const { id, amount, currency, email } = await TransactionsUseCases.create(type)
				await new Promise((res: (val?: any) => void, rej: (val?: any) => void) => {
					// @ts-ignore
					const modal = window.FlutterwaveCheckout({
						public_key: global.flutterwave!.publicKey,
						tx_ref: id, amount, currency, customer: { email },
						payment_options: 'card',
						customizations: { title: 'Stranerd', description, logo: domain + '/images/icon.png' },
						callback: () => {
							modal.close()
							res()
						},
						onclose: (incomplete: boolean) => incomplete ? rej('transaction not completed') : res()
					})
				})
				await TransactionsUseCases.fulfill(id)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { error, loading, createTransaction }
}
