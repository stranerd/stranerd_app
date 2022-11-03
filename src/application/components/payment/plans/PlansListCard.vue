<template>
	<div class="flex flex-col p-6 flex-1 rounded-2xl bg-bodyBg shadow-xl">
		<span class="font-semibold capitalize text-lg">{{ plan.name }}</span>
		<span class="text-3xl font-semibold tracking-wider">
			<span v-if="plan.isFree">Free</span>
			<span v-else>
				<span v-html="formatCurrency(plan.currency) + plan.amount" />
			</span>
		</span>
		<span class="font-light">{{ plan.isFree ? 'forever' : plan.interval }}</span>

		<div class="flex flex-col gap-2 mt-3 mb-6 text-sm">
			<span v-for="feature in plan.features" :key="feature.name" class="flex items-center gap-2">
				<IonIcon :class="feature.available ? 'text-success' : 'text-danger'"
					:icon="feature.available ? checkmarkOutline : closeOutline" />
				<IonText>{{ feature.name }}</IonText>
			</span>
		</div>

		<IonButton v-if="!plan.id" :disabled="loading || !wallet?.subscription.next" class="btn-primary"
			@click="cancelSubscription">
			{{ wallet?.subscription.next || wallet?.subscription.active ? 'End current subscription' : 'Subscribed' }}
		</IonButton>
		<IonButton v-else-if="!plan.active" :disabled="true" class="btn-primary primary-danger">
			Coming soon
		</IonButton>
		<IonButton v-else-if="wallet?.subscription.current?.id === plan.id"
			:disabled="loading || wallet?.subscription.active"
			class="btn-primary" @click="openSubscriptionDetailsMenu(plan)">
			{{ wallet?.subscription.active ? 'Subscribed' : 'Renew' }}
		</IonButton>
		<IonButton v-else :disabled="loading" class="btn-primary" @click="openSubscriptionDetailsMenu(plan)">
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
import { openSubscriptionDetailsMenu } from '@app/composable/payment/plans'

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
		const { loading, error, cancelSubscription } = useWallet()
		return {
			checkmarkOutline, cardOutline, closeOutline, loading, error,
			formatCurrency, wallet, openSubscriptionDetailsMenu, cancelSubscription
		}
	}
})
</script>
