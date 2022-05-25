<template>
	<DashboardLayout>
		<div class="md:p-4 flex flex-col gap-4 md:gap-6">
			<template v-if="isLoggedIn">
				<!-- <StatusBar /> -->
				<AspirantDashboard v-if="user?.isAspirant" />
				<GeneralDashboard v-else />
			</template>
			<template v-else>
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
import AspirantDashboard from '@app/components/dashboard/AspirantDashboard.vue'

export default defineComponent({
	name: 'Dashboard',
	displayName: 'Dashboard',
	components: { GeneralDashboard, AspirantDashboard, DashboardLayout, StatusBar },
	setup () {
		const { isLoggedIn, user } = useAuth()
		return { isLoggedIn, user }
	}
})
</script>
