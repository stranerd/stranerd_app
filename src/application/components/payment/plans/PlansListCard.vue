<template>
	<div class="flex flex-col border border-disabled gap-4 p-6 flex-1 rounded-2xl">
		<span class="font-medium capitalize leading-none">{{ plan.name }}</span>
		<IonText>
			<span class="text-2xl font-semibold tracking-wider leading-none"><span
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
		<IonButton v-else-if="wallet?.subscription.current?.id === plan.id"
			:disabled="loading || wallet?.subscription.active"
			class="btn-primary" @click="subscribeToPlan(plan.id)">
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
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'PlansListCard',
	props: {
		plan: {
			type: PlanEntity,
			required: true
		}
	},
	setup () {
		const { wallet } = useAuth()
		const { loading, error, subscribeToPlan, cancelSubscription } = useWallet()
		return {
			checkmarkOutline, cardOutline, closeOutline, loading, error,
			formatCurrency, wallet, subscribeToPlan, cancelSubscription
		}
	}
})
</script>
