<template>
	<div class="flex align-items-start table-data-style p-1">
		<div class="col-3">
			<DynamicText>{{ formatTime(transaction.createdAt) }}</DynamicText>
		</div>
		<div class="col-3 flex align-items-center gap-0-25">
			<Coins :gold="transaction.isGold" :size="24" />
			<DynamicText :class="transaction.isGain ? 'text-success' : 'text-danger'">
				{{ formatNumber(transaction.amount) }}
			</DynamicText>
		</div>
		<div class="col-6">
			<DynamicText>{{ transaction.event }}</DynamicText>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { TransactionEntity } from '@/modules/users'
import { formatNumber } from '@/utils/commons'
import { formatTime } from '@/utils/dates'

export default defineComponent({
	name: 'UserTransactionListCard',
	props: {
		transaction: {
			required: true,
			type: Object as PropType<TransactionEntity>
		}
	},
	setup () {
		return { formatNumber, formatTime }
	}
})
</script>
<style lang="scss" scoped>
	.table-data-style {
		border: 1px solid $color-line;
		border-radius: 7px;
		background: $color-tags;
		font-size: 15px;
		color: $color-dark;
	}
</style>
