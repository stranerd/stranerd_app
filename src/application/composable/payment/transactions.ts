import { onMounted, ref, Ref } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { GetTransactions, ListenToTransactions, TransactionEntity } from '@modules/users'

const global = {} as Record<string, {
	transactions: Ref<TransactionEntity[]>
	hasMore: Ref<boolean>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToTransactionList = (userId: string, transaction: TransactionEntity) => {
	const index = global[userId].transactions.value.findIndex((t) => t.id === transaction.id)
	if (index !== -1) global[userId].transactions.value.splice(index, 1, transaction)
	else global[userId].transactions.value.push(transaction)
}
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
