import { onMounted, ref, Ref } from 'vue'
<<<<<<< HEAD
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { GetTransactions, TransactionEntity } from '@modules/users'
=======
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { GetTransactions, ListenToTransactions, TransactionEntity } from '@modules/users'
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c

const global = {} as Record<string, {
	transactions: Ref<TransactionEntity[]>
	hasMore: Ref<boolean>
	fetched: Ref<boolean>
<<<<<<< HEAD
=======
	listener: ReturnType<typeof useListener>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToTransactionList = (userId: string, transaction: TransactionEntity) => {
	const index = global[userId].transactions.value.findIndex((t) => t.id === transaction.id)
	if (index !== -1) global[userId].transactions.value.splice(index, 1, transaction)
	else global[userId].transactions.value.push(transaction)
}
<<<<<<< HEAD

export const useTransactionList = (userId: string) => {
	if (global[userId] === undefined) global[userId] = {
		transactions: ref([]),
		hasMore: ref(false),
		fetched: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchTransactions = async () => {
=======
const unshiftToTransactionList = (userId: string, transaction: TransactionEntity) => {
	const index = global[userId].transactions.value.findIndex((t) => t.id === transaction.id)
	if (index !== -1) global[userId].transactions.value.splice(index, 1, transaction)
	else global[userId].transactions.value.unshift(transaction)
}

export const useTransactionList = (userId: string) => {
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			if (!userId) return () => {
			}
			const lastDate = global[userId].transactions.value[global[userId].transactions.value.length - 1]?.createdAt
			return ListenToTransactions.call(userId, {
				created: async (entity) => {
					unshiftToTransactionList(userId, entity)
				},
				updated: async (entity) => {
					unshiftToTransactionList(userId, entity)
				},
				deleted: async (entity) => {
					const index = global[userId].transactions.value.findIndex((t) => t.id === entity.id)
					if (index !== -1) global[userId].transactions.value.splice(index, 1)
				}
			}, lastDate)
		})
		global[userId] = {
			transactions: ref([]),
			hasMore: ref(false),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchTransactions = async () => {
		if (!userId) return
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
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

	onMounted(async () => {
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchTransactions()
	})

	return { ...global[userId], fetchOlderTransactions: fetchTransactions }
}
