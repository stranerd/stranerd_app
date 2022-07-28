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

			<CardsList class="border-bottom-line card-padding !lg:p-0" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import SettingsPanel from '@app/components/layout/panels/SettingsPanel.vue'
import { arrowForwardOutline } from 'ionicons/icons'
import { usePlanList } from '@app/composable/payment/plans'
import CardsList from '@app/components/payment/cards/CardsList.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'SettingsSubscription',
	components: { SettingsPanel, CardsList },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Subscription', { back: true })
		const { wallet } = useAuth()
		const { plans } = usePlanList()
		const plan = computed(() => plans.value.find((p) => p.id === wallet.value?.subscription.current?.id))
		return { arrowForwardOutline, plan }
	}
})
</script>
