<template>
	<div class="flex flex-col !gap-6">
		<IonText class="font-bold">Payment method</IonText>
		<EmptyState v-if="!loading && !error && cards.length === 0" info="No cards saved" />
		<span v-for="card in cards" :key="card.hash" class="flex items-center gap-2">
			<IonIcon :icon="cardOutline" />
			<IonText>**** **** **** {{ card.last4Digits }}</IonText>
		</span>
		<BlockLoading v-if="loading" />
		<a class="flex items-center gap-4" @click="createTransaction">
			<IonIcon :icon="addOutline" />
			<IonText>Add debit/credit card</IonText>
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addOutline, cardOutline } from 'ionicons/icons'
import { useCreateTransaction } from '@app/composable/payment/transactions'
import { TransactionType } from '@modules/payment'
import { useCardsList } from '@app/composable/payment/cards'

export default defineComponent({
	name: 'CardsList',
	setup () {
		const { cards, loading, error } = useCardsList()
		const { createTransaction } = useCreateTransaction(TransactionType.NewCard)
		return {
			addOutline, cardOutline, createTransaction,
			cards, loading, error
		}
	}
})
</script>
