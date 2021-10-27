<template>
  	<div class="flex items-center mt-4 table-data-style">
				<div class="w-3/12">
					<span>{{ formatTime(transaction.createdAt) }}</span>
				</div>
				<div class="w-3/12 flex items-center gap-2">
					<Coins :gold="transaction.isGold" :size="24"/>
                    
					<span >
						<!-- {{transaction.isGain ? '+' : '-'}} -->
                        {{ formatNumber(transaction.amount) }}
					</span>
				</div>
				<div class="w-6/12 font-normal">
					<span>{{ transaction.event }}</span>
				</div>
			</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Coins from '../core/Coins.vue'
import { formatNumber } from '@/utils/commons'
import { formatTime } from '@/utils/dates'
import { TransactionEntity } from '@/modules/users'

export default defineComponent( {
	name: 'UserTransactionListCard',
	components:{Coins, },
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

<style scoped lang="scss">
	.table-data-style {
		border-radius: 6px;
		background: #F7F7FC;
		font-weight: 700;
		font-size: 15px;
		color: $color-sub;
		padding: 1rem 2.281rem;
	}
</style>