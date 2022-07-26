<template>
	<DefaultLayout>
		<template v-slot:panel>
			<SettingsPanel />
		</template>

		<PlansList class="p-4 lg:p-0" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import SettingsPanel from '@app/components/layout/panels/SettingsPanel.vue'
import PlansList from '@app/components/payment/plans/PlansList.vue'

export default defineComponent({
	name: 'SettingsSubscriptionPlans',
	components: { SettingsPanel, PlansList },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Available plans', { back: true })
	}
})
</script>
