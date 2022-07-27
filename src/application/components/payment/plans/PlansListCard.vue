<template>
	<div class="flex flex-col border gap-4 p-6 flex-1 rounded-2xl">
		<span class="font-bold capitalize">{{ plan.name }}</span>
		<IonText>
			<span class="text-xl font-bold tracking-wider"><span
				v-html="formatCurrency(plan.currency)" />{{ plan.amount }}</span>
			<span>&nbsp;{{ plan.interval }}</span>
		</IonText>
		<span v-for="feature in plan.features" :key="feature.name" class="flex items-center gap-2">
			<IonIcon :class="feature.available ? 'text-success' : 'text-danger'"
				:icon="feature.available ? checkmarkOutline : closeOutline" />
			<IonText>{{ feature.name }}</IonText>
		</span>

		<IonButton v-if="!plan.id" :disabled="true" class="btn-primary">
			Subscribe
		</IonButton>
		<IonButton v-else-if="wallet?.currentSubscriptionId === plan.id"
			:disabled="loading || wallet?.subscription.active"
			class="btn-primary" @click="renewSubscription">
			{{ wallet?.subscription.active ? 'Subscribed' : 'Renew' }}
		</IonButton>
		<IonButton v-else :disabled="loading" class="btn-primary" @click="subscribeToPlan(plan.id)">
			Subscribe
		</IonButton>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { cardOutline, checkmarkOutline, closeOutline } from 'ionicons/icons'
import { formatCurrency } from '@utils/commons'
import { useWallet } from '@app/composable/payment/wallets'
import { PlanEntity } from '@modules/payment'

export default defineComponent({
	name: 'PlansListCard',
	props: {
		plan: {
			type: PlanEntity,
			required: true
		}
	},
	setup () {
		const { wallet, loading, error, subscribeToPlan, renewSubscription, cancelSubscription } = useWallet()
		return {
			checkmarkOutline, cardOutline, closeOutline, loading, error,
			formatCurrency, wallet, subscribeToPlan, renewSubscription, cancelSubscription
		}
	}
})
</script>
