<template>
	<Justified>
		<div class="flex flex-col py-4 text-secondaryText">
			<router-link v-for="item in [
					{ name: 'Edit Profile', icon: personOutline, route: '/settings/profile' },
					{ name: 'Edit School', icon: schoolOutline, route: '/settings/school' },
					{ name: 'Security', icon: shieldCheckmarkOutline, route: '/settings/security' },
					{ name: 'Contact Us', icon: mailOutline, route: '/settings/contact' },
					{ name: 'About', icon: informationCircleOutline, route: '/settings/about' },
				]" :key="item.route" :to="item.route"
				class="p-4 flex items-center gap-4">
				<IonIcon :icon="item.icon" class="text-heading2" />
				<span>{{ item.name }}</span>
			</router-link>
			<a class="border-top-line mt-2 px-4 py-6 flex items-center text-danger gap-4" @click.prevent="signout">
				<IonIcon :icon="logOutOutline" class="text-heading2" />
				<span>Sign out</span>
			</a>
			<PageLoading v-if="loading" />
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
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

export default defineComponent({
	name: 'Settings',
	displayName: 'Settings',
	components: { Justified },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
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
