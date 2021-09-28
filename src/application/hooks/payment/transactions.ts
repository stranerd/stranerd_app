import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'
import { GetTransactions, TransactionEntity } from '@modules/users'

const global = {} as Record<string, {
	transactions: Ref<TransactionEntity[]>;
	hasMore: Ref<boolean>;
	fetched: Ref<boolean>;
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToTransactionList = (userId: string, transaction: TransactionEntity) => {
	const index = global[userId].transactions.value.findIndex((t) => t.id === transaction.id)
	if (index !== -1) global[userId].transactions.value.splice(index, 1, transaction)
	else global[userId].transactions.value.push(transaction)
}

export const useTransactionList = (userId: string) => {
	if (global[userId] === undefined) global[userId] = {
		transactions: ssrRef([]),
		hasMore: ssrRef(false),
		fetched: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchTransactions = async () => {
		await global[userId].setError('')
		await global[userId].setLoading(true)
		try {
			const lastDate = global[userId].transactions.value[global[userId].transactions.value.length - 1]?.createdAt
			const transactions = await GetTransactions.call(userId, lastDate)
			global[userId].hasMore.value = !!transactions.pages.next
			transactions.results.forEach((t) => pushToTransactionList(userId, t))
			global[userId].fetched.value = true
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	useFetch(async () => {
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchTransactions()
	})

	return { ...global[userId], fetchOlderTransactions: fetchTransactions }
}
