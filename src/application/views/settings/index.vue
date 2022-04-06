<template>
	<Justified>
		<div class="lg:w-8/12 w-full mx-auto md:p-4 lg:py-8 flex flex-col md:gap-4 max-w-[1000px]">
			<router-link v-for="item in [
					{ name: 'Edit Profile', icon: personOutline, route: '/settings/profile' },
					{ name: 'Account Setup', icon: settingsOutline, route: '/settings/account' },
					// { name: 'Manage Notifications', icon: notificationsOutline, route: '/notifications' },
					{ name: 'Security', icon: shieldCheckmarkOutline, route: '/settings/security' },
					{ name: 'About', icon: informationCircleOutline, route: '/settings/about' },
					{ name: 'Contact Us', icon: mailOutline, route: '/settings/contact' },
				]" :key="item.route" :to="item.route"
				class="md:rounded-xl md:bg-white p-4 border-bottom-line flex gap-4 items-center">
				<IonIcon :icon="item.icon" class="text-2xl text-gray" />
				<span class="font-semibold">{{ item.name }}</span>
			</router-link>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import {
	informationCircleOutline,
	mailOutline,
	notificationsOutline,
	personOutline,
	settingsOutline,
	shieldCheckmarkOutline
} from 'ionicons/icons'

export default defineComponent({
	name: 'Settings',
	displayName: 'Settings',
	components: { Justified },
	middlewares: ['isAuthenticated'],
	setup () {
		return {
			personOutline,
			settingsOutline,
			notificationsOutline,
			shieldCheckmarkOutline,
			informationCircleOutline,
			mailOutline
		}
	}
})
</script>
