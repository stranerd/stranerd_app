<template>
	<div class="modal-content">
		<div v-if="plan" class="showcase-flex">
			<div class="card-sm bg-highlight card-padding flex flex-col gap-3">
				<IonText class="text-lg">
					Your payment method will be charged
					<span v-html="formatCurrency(plan.currency) + plan.amount" /> + applicable tax
				</IonText>
			</div>
			<div class="card-sm flex flex-col card-padding w-full">
				<span class="font-bold text-lg">Billing Details</span>
				<IonText class="text-secondaryText">
					By clicking Continue below, you are agreeing to our Stranerd Terms of Use, Privacy policy and for
					Stranerd to charge your payment method for <span
						v-html="formatCurrency(plan.currency) + plan.amount" /> (+ tax
					if applicable) for your monthly subscription to Stranerd. Stranerd will automatically charge your
					payment method monthly until you choose to cancel your subscription.
				</IonText>
			</div>
			<div class="card-sm flex flex-col card-padding w-full">
				<span class="font-bold text-lg">Your subscription includes:</span>
				<div class="text-secondaryText flex flex-col gap-2">
					<span v-for="label in plan.featuresDescription" :key="label" class="flex items-center gap-2">
						<IonIcon :icon="checkmarkOutline" class="text-success" />
						<IonText>{{ label }}</IonText>
					</span>
				</div>
			</div>
			<div class="card-sm flex flex-col card-padding w-full">
				<span class="font-bold text-lg">Making Payment</span>
				<IonText class="text-secondaryText">
					If you don't have a payment method saved already, you will be directed to Flutterwave to add one,
					and an additional <span v-html="formatCurrency('NGN') + 10" /> will be charged to verify your card.
					This <span v-html="formatCurrency('NGN') + 10" /> will be added to your wallet balance if it is
					verified successfully
				</IonText>
			</div>
			<IonButton :disabled="loading" class="btn-primary w-full" @click="subscribeToPlan(plan.id)">
				Continue
			</IonButton>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getCurrentlySubscribingTo } from '@app/composable/payment/plans'
import { useWallet } from '@app/composable/payment/wallets'
import { formatCurrency } from '@utils/commons'
import { checkmarkOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'SubscriptionDetails',
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup (props) {
		const plan = getCurrentlySubscribingTo()
		if (!plan) props.close()
		const { loading, error, subscribeToPlan } = useWallet()
		return { loading, error, formatCurrency, plan, subscribeToPlan, checkmarkOutline }
	}
})
</script>
