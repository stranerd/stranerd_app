<template>
	<DefaultLayout>
		<div class="showcase-flex text-secondaryText">
			<router-link v-for="item in [
					{ name: 'Edit Profile', icon: personOutline, route: '/settings/profile' },
					{ name: 'Edit School', icon: schoolOutline, route: '/settings/school' },
					{ name: 'Security', icon: shieldCheckmarkOutline, route: '/settings/security' },
					{ name: 'Subscription', route: '/account/subscription', icon: cardOutline },
					{ name: 'Contact Us', icon: mailOutline, route: '/contact' },
					{ name: 'About', icon: informationCircleOutline, route: '/settings/about' },
				]" :key="item.route" :to="item.route"
				class="card-sm card-padding flex items-center !gap-4" exact-active-class="hasBg">
				<IonIcon :icon="item.icon" />
				<span>{{ item.name }}</span>
			</router-link>
			<a class="card-sm card-padding !gap-4 flex items-center text-danger"
				@click.prevent="signout">
				<IonIcon :icon="logOutOutline" />
				<span>Sign out</span>
			</a>
			<PageLoading v-if="loading" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	cardOutline,
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

export default defineComponent({
	name: 'Settings',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Settings', { back: true })
		const { signout, loading } = useSessionSignout()
		return {
			signout, loading,
			personOutline, schoolOutline, notificationsOutline, shieldCheckmarkOutline,
			informationCircleOutline, mailOutline, logOutOutline, cardOutline
		}
	}
})
</script>
