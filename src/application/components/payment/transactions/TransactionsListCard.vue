<template>
	<div class="flex justify-between items-center card-sm card-padding">
		<div class="flex-1 flex flex-col">
			<IonText class="font-bold truncate">{{ transaction.title }}</IonText>
			<span class="text-sm text-secondaryText">{{ formatTime(transaction.createdAt) }}</span>
		</div>
		<IonText :class="transaction.isNegative || transaction.failed ? 'text-danger' : 'text-success'">
			{{ transaction.isNegative ? '-' : '+' }}<span
				v-html="formatCurrency(transaction.currency)" />{{ Math.abs(transaction.amount) }}
		</IonText>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { TransactionEntity } from '@modules/payment'
import { formatCurrency } from '@utils/commons'
import { formatTime } from '@utils/dates'

export default defineComponent({
	name: 'TransactionsListCard',
	props: {
		transaction: {
			type: TransactionEntity,
			required: true
		}
	},
	setup () {
		return { formatCurrency, formatTime }
	}
})
</script>
