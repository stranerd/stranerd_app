<template>
	<FullLayout>
		<DashboardView />
	</FullLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import DashboardView from '@app/components/dashboard/DashboardView.vue'

export default defineComponent({
	name: 'Dashboard',
	components: { DashboardView },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Home', {})
	}
})
</script>
