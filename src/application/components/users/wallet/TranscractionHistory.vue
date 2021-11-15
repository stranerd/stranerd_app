<template>
	<div class="flex justify-between items-center mt-8 pb-2">
		<span class="font-bold text-dark_gray text-base" variant="1">
			Transaction history
		</span>

		<!-- <ion-select class="max-w-[138px] text-xs md:text-sm  placeholder-[#8B9EB1] font-bold" interface="action-sheet"
			placeholder="Daily" value="notifications">
			<ion-select-option value="maths">Daily</ion-select-option>
			<ion-select-option value="physics">Monthly</ion-select-option>
			<ion-select-option value="bio">Yearly</ion-select-option>

		</ion-select> -->
	</div>

	<div class="flex flex-col items-center justify-content-center gap-1 gap-md-2">
		<div class="flex flex-col gap-0-5 w-full">
			<div class="flex table-custom-style  text-dark bg-line">
				<div class="w-3/12">
					<span>Date</span>
				</div>
				<div class="w-3/12">
					<span>Amount</span>
				</div>
				<div class="w-6/12 text-end">
					<span>Description</span>
				</div>
			</div>

			<TranscrationHistoryCard
				v-for="transaction in transactions"
				:key="transaction.hash"
				:transaction="transaction"
			/>


		</div>

		<div v-if="hasMore" class="text-center text-lg text-primary font-bold cursor-pointer">
			<a class="text-primary-dark py-2" @click.prevent="fetchOlderTransactions">LOAD MORE</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTransactionList } from '@app/composable/payment/transactions'
import TranscrationHistoryCard from './TranscrationHistoryCard.vue'

export default defineComponent({
	name: 'Transcration History',
	props: {
		userId: {
			required: true,
			type: String
		}
	},
	components: { TranscrationHistoryCard },
	setup (props) {
		const { loading, error, transactions, hasMore, fetchOlderTransactions } = useTransactionList(props.userId)
		return { loading, error, transactions, hasMore, fetchOlderTransactions }
	}

})
</script>

<style lang="scss" scoped>
	ion-select {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
		background-color: #F7F7FC;
		--padding-end: 1rem;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
		border-radius: 12px;

	}


	.table-custom-style {
		border-radius: 7px;
		background: $color-sub;
		font-weight: bold;
		font-size: 15px;
		color: white;
		padding: 1rem 2.281rem;
	}


</style>
