<template>
	<div id="methods" class="flex flex-col gap-4">
		<IonText class="font-bold">Payment methods</IonText>
		<EmptyState v-if="!loading && !error && methods.length === 0" info="No methods saved" />
		<MethodsListCard v-for="method in methods" :key="method.hash" :method="method" />
		<BlockLoading v-if="loading" />
		<IonButton class="btn-primary" @click="createTransaction">
			<IonIcon :icon="addOutline" class="mr-4" />
			<IonText>Add debit/credit card</IonText>
		</IonButton>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addOutline } from 'ionicons/icons'
import { useCreateTransaction } from '@app/composable/payment/transactions'
import { TransactionType } from '@modules/payment'
import { useMethodsList } from '@app/composable/payment/methods'
import MethodsListCard from '@app/components/payment/methods/MethodsListCard.vue'

export default defineComponent({
	name: 'MethodsList',
	components: { MethodsListCard },
	setup () {
		const { methods, loading, error } = useMethodsList()
		const { createTransaction } = useCreateTransaction(TransactionType.NewCard, 'A test amount will be charged and added to your wallet to see if the card works fine')
		return { createTransaction, methods, loading, error, addOutline }
	}
})
</script>
