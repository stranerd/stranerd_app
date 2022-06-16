<template>
	<DefaultLayout>
		<GeneralDashboard />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import GeneralDashboard from '@app/components/dashboard/GeneralDashboard.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'Dashboard',
	components: { GeneralDashboard },
	setup () {
		useRouteMeta('Dashboard', {})
		const { isLoggedIn, user } = useAuth()
		return { isLoggedIn, user }
	}
})
</script>
