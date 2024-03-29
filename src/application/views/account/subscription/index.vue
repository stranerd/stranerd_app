<template>
	<DefaultLayout>
		<div class="flex flex-col">
			<div class="flex flex-col border-bottom-line gap-4 p-4 lg:py-6 lg:px-0">
				<IonText>Current Plan</IonText>
				<div class="flex flex-col gap-4 border border-disabled card-padding rounded-xl">
					<IonText class="text-xl font-bold capitalize">{{ plan?.name }}</IonText>
					<div v-if="wallet" class="gap-2 flex items-center">
						<IonIcon :icon="helpCircleOutline" />
						<IonText>
							You have {{ wallet?.subscription.data.questions }}
							{{ pluralize(wallet?.subscription.data.questions, 'question', 'questions') }} to ask
						</IonText>
					</div>
				</div>
			</div>

			<router-link class="border-bottom-line card-padding lg:px-0 flex items-center justify-between gap-4"
				to="/account/subscription/plans">
				<IonText>See available plans</IonText>
				<IonIcon :icon="arrowForwardOutline" />
			</router-link>

			<MethodsList class="border-bottom-line p-4 lg:py-6 lg:px-0 border-bottom-line" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { arrowForwardOutline, helpCircleOutline } from 'ionicons/icons'
import { usePlanList } from '@app/composable/payment/plans'
import MethodsList from '@app/components/payment/methods/MethodsList.vue'
import { useAuth } from '@app/composable/auth/auth'
import { pluralize } from '@utils/commons'

export default defineComponent({
	name: 'AccountSubscription',
	components: { MethodsList },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Subscription', { back: true })
		const { wallet } = useAuth()
		const { plans } = usePlanList()
		const plan = computed(() => plans.value.find((p) => p.id === wallet.value?.subscription.current?.id))
		return {
			arrowForwardOutline, helpCircleOutline,
			plan, wallet, pluralize
		}
	}
})
</script>
