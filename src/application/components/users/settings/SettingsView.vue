<template>
	<div class="flex flex-col py-4 text-secondaryText">
		<router-link v-for="item in [
				{ name: 'Edit Profile', icon: personOutline, route: '/settings/profile' },
				{ name: 'Edit School', icon: schoolOutline, route: '/settings/school' },
				{ name: 'Security', icon: shieldCheckmarkOutline, route: '/settings/security' },
				{ name: 'Contact Us', icon: mailOutline, route: '/settings/contact' },
				{ name: 'About', icon: informationCircleOutline, route: '/settings/about' },
			]" :key="item.route" :to="item.route"
			class="p-4 flex items-center gap-4">
			<IonIcon :icon="item.icon" />
			<span>{{ item.name }}</span>
		</router-link>
		<a class="border-top-line mt-2 px-4 py-6 flex items-center text-danger gap-4" @click.prevent="signout">
			<IonIcon :icon="logOutOutline" />
			<span>Sign out</span>
		</a>
		<PageLoading v-if="loading" />
	</div>
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

export default defineComponent({
	name: 'SettingsView',
	setup () {
		const { signout, loading } = useSessionSignout()
		return {
			signout, loading,
			personOutline, schoolOutline, notificationsOutline, shieldCheckmarkOutline,
			informationCircleOutline, mailOutline, logOutOutline
		}
	}
})
</script>
