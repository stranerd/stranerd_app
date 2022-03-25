<template>
	<DashboardLayout>
		<div class="md:p-4 flex flex-col gap-4 md:gap-6">
			<template v-if="isLoggedIn">
				<StatusBar />
				<GeneralDashboard />
			</template>
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import StatusBar from '@app/components/dashboard/StatusBar.vue'
import { useAuth } from '@app/composable/auth/auth'
import GeneralDashboard from '@app/components/dashboard/GeneralDashboard.vue'

export default defineComponent({
	name: 'Dashboard',
	displayName: 'Dashboard',
	components: { GeneralDashboard, DashboardLayout, StatusBar },
	setup () {
		const { isLoggedIn } = useAuth()
		return { isLoggedIn }
	}
})
</script>
