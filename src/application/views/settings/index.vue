<template>
	<FullLayout>
		<SettingsView />
	</FullLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	informationCircleOutline,
	logOutOutline,
	mailOutline,
	notificationsOutline,
	personOutline,
	schoolOutline,
	shieldCheckmarkOutline
} from 'ionicons/icons'
import { useSessionSignout } from '@app/composable/auth/session'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import SettingsView from '@app/components/users/settings/SettingsView.vue'

export default defineComponent({
	name: 'Settings',
	components: { SettingsView },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Settings', { back: true })
		const { signout, loading } = useSessionSignout()
		return {
			signout, loading,
			personOutline, schoolOutline, notificationsOutline, shieldCheckmarkOutline,
			informationCircleOutline, mailOutline, logOutOutline
		}
	}
})
</script>
