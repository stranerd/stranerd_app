<template>
	<div
		:class="`m-0  h-[6rem] cardPadding ${colorClass}  md:rounded-xl rounded-md flex flex-col md:gap-2 gap-[1rem] box-border  p-5`"
	>
		<div class="flex items-center normalText font-bold text-dark_gray gap-2">
			<Coins :gold="transaction.isGold" :size="24" />
			<span>{{ formatNumber(transaction.amount) }}</span>
			<span>|</span>
			<span>{{ formatTime(transaction.createdAt) }}</span>
		</div>

		<span class="normalText font-normal text-dark">
			{{ transaction.event }}
		</span>


	</div>
</template>

<script lang="ts">
import { calendar, time } from 'ionicons/icons'
import Coins from '../../core/Coins.vue'
import { TransactionEntity } from '@modules/users'
import { defineComponent, PropType } from 'vue'
import { formatNumber } from '@utils/commons'
import { formatTime } from '@utils/dates'

export default defineComponent({
	name: 'TutorCard',
	components: { Coins },
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		transaction: {
			required: true,
			type: Object as PropType<TransactionEntity>
		}
	},
	setup () {
		return {
			formatNumber,
			formatTime,
			calendar, time
		}
	}

})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
