<template>
	<DefaultLayout>
		<template v-slot:panel>
			<SettingsPanel />
		</template>

		<div class="flex flex-col lg:gap-8">
			<div class="flex flex-col border-bottom-line gap-4 p-4 lg:p-0">
				<IonText>Current Plan</IonText>
				<IonText class="text-xl font-bold capitalize">{{ plan?.name }}</IonText>
			</div>

			<router-link class="border-bottom-line card-padding lg:p-0 flex items-center justify-between gap-4"
				to="/settings/subscription/plans">
				<IonText>See available plans</IonText>
				<IonIcon :icon="arrowForwardOutline" />
			</router-link>

			<div class="flex flex-col border-bottom-line gap-7 p-4 lg:p-0">
				<IonText class="font-bold">Payment method</IonText>
				<span class="flex items-center gap-2">
					<IonIcon :icon="cardOutline" />
					<IonText>**** **** **** 3227</IonText>
				</span>
				<span class="flex items-center gap-4">
					<IonIcon :icon="addOutline" />
					<IonText>Add debit/credit card</IonText>
				</span>
			</div>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import SettingsPanel from '@app/components/layout/panels/SettingsPanel.vue'
import { addOutline, arrowForwardOutline, cardOutline } from 'ionicons/icons'
import { useWallet } from '@app/composable/payment/wallets'
import { usePlanList } from '@app/composable/payment/plans'

export default defineComponent({
	name: 'SettingsSubscription',
	components: { SettingsPanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Subscription', { back: true })
		const { wallet } = useWallet()
		const { plans } = usePlanList()
		const plan = computed(() => plans.value.find((p) => p.id === wallet.value?.currentSubscriptionId))
		return { addOutline, cardOutline, arrowForwardOutline, plan }
	}
})
</script>
