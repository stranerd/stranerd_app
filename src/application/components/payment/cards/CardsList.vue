<template>
	<div id="cards" class="flex flex-col !gap-6">
		<IonText class="font-bold">Payment method</IonText>
		<EmptyState v-if="!loading && !error && cards.length === 0" info="No cards saved" />
		<CardsListCard v-for="card in cards" :key="card.hash" :card="card" />
		<BlockLoading v-if="loading" />
		<a class="flex items-center gap-4" @click="createTransaction">
			<IonIcon :icon="addOutline" />
			<IonText>Add debit/credit card</IonText>
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addOutline } from 'ionicons/icons'
import { useCreateTransaction } from '@app/composable/payment/transactions'
import { TransactionType } from '@modules/payment'
import { useCardsList } from '@app/composable/payment/cards'
import CardsListCard from '@app/components/payment/cards/CardsListCard.vue'

export default defineComponent({
	name: 'CardsList',
	components: { CardsListCard },
	setup() {
		const { cards, loading, error } = useCardsList()
		const { createTransaction } = useCreateTransaction(TransactionType.NewCard, 'A test amount will be charged and added to your wallet to see if the card works fine')
		return { createTransaction, cards, loading, error, addOutline }
	}
})
</script>
