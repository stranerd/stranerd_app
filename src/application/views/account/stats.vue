<template>
	<DefaultLayout>
		<template v-slot:panel>
			<ProfilePanel />
		</template>
		<GeneralDashboard />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import GeneralDashboard from '@app/components/dashboard/GeneralDashboard.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import ProfilePanel from '@app/components/layout/panels/ProfilePanel.vue'

export default defineComponent({
	name: 'AccountStats',
	components: { GeneralDashboard, ProfilePanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Stats', { back: true })
		const { user } = useAuth()
		return { user }
	}
})
</script>
