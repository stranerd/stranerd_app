<template>
	<DefaultLayout>
		<PlansList class="p-4 lg:p-0" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import PlansList from '@app/components/payment/plans/PlansList.vue'

export default defineComponent({
	name: 'AccountSubscriptionPlans',
	components: { PlansList },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Available plans', { back: true })
	}
})
</script>
