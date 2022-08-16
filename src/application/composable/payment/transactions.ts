import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { FlutterwaveSecrets, TransactionEntity, TransactionsUseCases, TransactionType } from '@modules/payment'
import { useScripts } from '@app/composable/core/scripts'
import { domain } from '@utils/environment'
import { computed, onMounted, ref, watch } from 'vue'
import { addToArray } from '@utils/commons'

const now = Date.now()
const aWeekAgo = now - (7 * 24 * 60 * 60 * 1000)

const global = {
	flutterwave: null as FlutterwaveSecrets | null,
	from: ref(aWeekAgo),
	to: ref(now),
	transactions: ref([] as TransactionEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

export const useTransactionsList = () => {
	const fetchTransactions = async (reset = false) => {
		if (reset) global.transactions.value = []
		await global.setError('')
		try {
			await global.setLoading(true)
			const transactions = await TransactionsUseCases.getInRange(global.from.value, global.to.value, global.transactions.value.at(-1)?.createdAt)
			global.hasMore.value = !!transactions.pages.next
			transactions.results.forEach((q) => addToArray(global.transactions.value, q, (e) => e.id, (e) => e.createdAt))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	const from = computed({
		get: () => new Date(global.from.value).toISOString().substring(0, 10),
		set: (value: string) => {
			global.from.value = new Date(value).getTime()
		}
	})
	const to = computed({
		get: () => new Date(global.to.value).toISOString().substring(0, 10),
		set: (value: string) => {
			global.to.value = new Date(value.substring(0, 10) + 'T23:59:59').getTime()
		}
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTransactions(true)
		else global.from.value = Date.now()
	})
	watch([global.from, global.to], async () => {
		await fetchTransactions(true)
	})

	return {
		...global, from, to,
		fetchOlderTransactions: async () => await fetchTransactions(false)
	}
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
