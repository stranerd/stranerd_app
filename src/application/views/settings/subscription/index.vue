<template>
	<DefaultLayout>
		<template v-slot:panel>
			<SettingsPanel />
		</template>

		<div class="flex flex-col lg:gap-12">
			<div class="flex flex-col border-bottom-line gap-4 p-4 lg:p-0">
				<IonText>Current Plan</IonText>
				<IonText class="text-2xl  font-bold">Basic Free</IonText>
			</div>

			<router-link class="border-bottom-line p-4 lg:p-0 flex items-center" to="/settings/subscription/plans">
				<IonText>See available plans</IonText>
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
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import SettingsPanel from '@app/components/layout/panels/SettingsPanel.vue'
import { addOutline, cardOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'SettingsSubscription',
	components: { SettingsPanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Subscription', { back: true })
		return { addOutline, cardOutline }
	}
})
</script>
