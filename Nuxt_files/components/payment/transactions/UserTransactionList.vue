<template>
	<div class="flex flex-col align-items-center justify-content-center gap-1 gap-md-2">
		<h4 class="headertext">
			Transaction history
		</h4>
		<div class="flex flex-col gap-0-5 w-100">
			<div class="flex table-custom-style p-1">
				<div class="col-3">
					<span>Date</span>
				</div>
				<div class="col-3">
					<span>Amount</span>
				</div>
				<div class="col-6">
					<span>Description</span>
				</div>
			</div>
			<UserTransactionListCard
				v-for="transaction in transactions"
				:key="transaction.hash"
				:transaction="transaction"
			/>
		</div>
		<div v-if="hasMore" class="text-center text-18">
			<div class="thick my-0" />
			<a class="text-primaryDark py-2" @click.prevent="fetchOlderTransactions">LOAD MORE</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTransactionList } from '@/application/hooks/payment/transactions'
import UserTransactionListCard from '@app/components/payment/transactions/UserTransactionListCard.vue'

export default defineComponent({
	name: 'UserTransactionList',
	components: { UserTransactionListCard },
	props: {
		userId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { loading, error, transactions, hasMore, fetchOlderTransactions } = useTransactionList(props.userId)
		return { loading, error, transactions, hasMore, fetchOlderTransactions }
	}
})
</script>
<style lang="scss" scoped>

	.headertext {
		font-weight: bold;
		color: $color-dark;
		margin: 0;
	}

	.table-custom-style {
		border: 1px solid $color-primary;
		border-radius: 7px;
		background: $color-line;
		font-weight: bold;
		font-size: 15px;
		color: $color-dark;
	}
</style>
