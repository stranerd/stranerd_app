import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { FlutterwaveSecrets, TransactionEntity, TransactionsUseCases, TransactionType } from '@modules/payment'
import { loadScript } from '@app/composable/core/scripts'
import { domain } from '@utils/environment'
import { computed, onMounted, ref, watch } from 'vue'
import { addToArray } from '@utils/commons'

const now = Date.now()
const aWeekAgo = now - (7 * 24 * 60 * 60 * 1000)

const store = {
	flutterwave: null as FlutterwaveSecrets | null,
	from: ref(aWeekAgo),
	to: ref(now),
	transactions: ref([] as TransactionEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

export const createTransaction = async (type: TransactionType, description: string) => {
	const unload = await loadScript('flutterwave', 'https://checkout.flutterwave.com/v3.js')
	// @ts-ignore
	if (!window.FlutterwaveCheckout) return false
	if (!store.flutterwave) store.flutterwave = await TransactionsUseCases.getFlutterwaveSecrets()
	const { id, amount, currency, email } = await TransactionsUseCases.create(type)
	await new Promise((res: (val?: any) => void, rej: (val?: any) => void) => {
		// @ts-ignore
		const modal = window.FlutterwaveCheckout({
			public_key: store.flutterwave!.publicKey,
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
	const res = await TransactionsUseCases.fulfill(id)
	unload()
	return res
}

export const useTransactionsList = () => {
	const fetchTransactions = async (reset = false) => {
		if (reset) store.transactions.value = []
		await store.setError('')
		try {
			await store.setLoading(true)
			const transactions = await TransactionsUseCases.getInRange(store.from.value, store.to.value, store.transactions.value.at(-1)?.createdAt)
			store.hasMore.value = !!transactions.pages.next
			transactions.results.forEach((q) => addToArray(store.transactions.value, q, (e) => e.id, (e) => e.createdAt))
			store.fetched.value = true
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}

	const from = computed({
		get: () => new Date(store.from.value).toISOString().substring(0, 10),
		set: (value: string) => {
			store.from.value = new Date(value).getTime()
		}
	})
	const to = computed({
		get: () => new Date(store.to.value).toISOString().substring(0, 10),
		set: (value: string) => {
			store.to.value = new Date(value.substring(0, 10) + 'T23:59:59').getTime()
		}
	})

	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchTransactions(true)
		else store.from.value = Date.now()
	})
	watch([store.from, store.to], async () => {
		await fetchTransactions(true)
	})

	return {
		...store, from, to,
		fetchOlderTransactions: async () => await fetchTransactions(false)
	}
}

export const useCreateTransaction = (type: TransactionType, description: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	const createTxn = async () => {
		let res = false
		await setError('')
		if (!loading.value) {
			try {
				await setLoading(true)
				res = await createTransaction(type, description)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
			return res
		}
	}

	return { error, loading, createTransaction: createTxn }
}
