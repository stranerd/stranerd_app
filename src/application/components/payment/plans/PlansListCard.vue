<template>
	<div class="flex flex-col p-6 flex-1 rounded-2xl bg-bodyBg shadow-xl">
		<span class="font-semibold capitalize text-lg">{{ plan.name }}</span>
		<span class="text-3xl font-semibold tracking-wider">
			<span v-html="formatCurrency(plan.currency)" />{{ plan.amount }}
		</span>
		<span class="font-light">{{ plan.amount === 0 ? 'forever' : plan.interval }}</span>

		<div class="flex flex-col gap-2 mt-3 mb-6 text-sm">
			<span v-for="feature in plan.featuresList" :key="feature.name" class="flex items-center gap-2">
				<IonIcon :class="feature.available ? 'text-success' : 'text-danger'"
					:icon="feature.available ? checkmarkOutline : closeOutline" />
				<IonText>{{ feature.name }}</IonText>
			</span>
		</div>

		<IonButton v-if="!plan.id" :disabled="true" class="btn-primary">
			Subscribe
		</IonButton>
		<IonButton v-else-if="!plan.active" :disabled="true" class="btn-primary primary-danger">
			Coming soon
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
