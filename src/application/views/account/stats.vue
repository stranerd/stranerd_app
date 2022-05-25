<template>
	<Justified>
		<GeneralDashboard />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'
import GeneralDashboard from '@app/components/dashboard/GeneralDashboard.vue'

export default defineComponent({
	name: 'AccountStats',
	components: { Justified, GeneralDashboard },
	displayName: 'Stats',
	middlewares: ['isAuthenticated'],
	setup () {
		const { user } = useAuth()
		return { user }
	}
})
</script>
