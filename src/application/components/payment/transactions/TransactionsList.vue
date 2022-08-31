<template>
	<div class="showcase-flex">
		<div class="flex lg:hidden gap-[1px]">
			<IonInput v-model="from" class="w-1/2" placeholder="From" required type="date" />
			<IonInput v-model="to" :min="from" class="w-1/2" placeholder="To" required type="date" />
		</div>

		<EmptyState v-if="!loading && !error && transactions.length === 0" class="border-bottom-line"
			info="No transactions available in this range!" />
		<TransactionsListCard v-for="transaction in transactions" :key="transaction.hash" :transaction="transaction"
			class="border-bottom-line" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore" :load="fetchOlderTransactions" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TransactionsListCard from '@app/components/payment/transactions/TransactionsListCard.vue'
import { useTransactionsList } from '@app/composable/payment/transactions'

export default defineComponent({
	name: 'TransactionsList',
	components: { TransactionsListCard },
	setup () {
		const {
			transactions, error, loading, hasMore, from, to, fetchOlderTransactions
		} = useTransactionsList()

		return {
			transactions, error, loading, hasMore, from, to,
			fetchOlderTransactions
		}
	}
})
</script>
