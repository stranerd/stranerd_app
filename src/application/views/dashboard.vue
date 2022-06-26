<template>
	<DefaultLayout>
		<template v-slot:panel>
			<DashboardView />
		</template>
		<div class="lg:hidden">
			<DashboardView />
		</div>
		<div class="hidden lg:flex">
			<GeneralDashboard />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import DashboardView from '@app/components/dashboard/DashboardView.vue'
import GeneralDashboard from '@app/components/dashboard/GeneralDashboard.vue'

export default defineComponent({
	name: 'Dashboard',
	components: { DashboardView, GeneralDashboard },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Home', {})
	}
})
</script>
