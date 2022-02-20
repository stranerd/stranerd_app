<template>
	<ion-header class="block ion-no-border z-40 inset-x-0 w-full lg:shadow-md">
		<ion-toolbar class="lg:hidden bg-white px-2 border-0 md:h-auto flex items-center justify-center">
			<div class="flex items-center justify-between">
				<Avatar v-if="isLoggedIn" :size="24" :src="user?.avatar"
					@click="openUserDashboardMenu" />
				<router-link v-else class="flex items-center" to="/account">
					<Avatar :size="24" :src="user?.avatar" />
				</router-link>
				<router-link class="flex items-center" to="/">
					<Logo :secondary="true" class="w-24" />
				</router-link>
				<router-link class="flex items-center" to="/notifications">
					<NotificationIcon :key="user?.id" class="text-xl text-main_dark" />
				</router-link>
			</div>
		</ion-toolbar>

		<!-- large screens -->
		<BigScreenBar />
	</ion-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonHeader, IonToolbar } from '@ionic/vue'
import BigScreenBar from './screens/BigScreenBar.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useMenuPopover } from '@app/composable/core/modals'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'

export default defineComponent({
	name: 'Topbar',
	components: { IonHeader, IonToolbar, BigScreenBar, NotificationIcon },
	setup () {
		const { isLoggedIn, user } = useAuth()
		const openUserDashboardMenu = useMenuPopover().openUserDashboardMenu
		return { user, isLoggedIn, openUserDashboardMenu }
	}
})
</script>

<style lang="scss" scoped>
	ion-toolbar {
		--background: #FFFFFF;
		--box-shadow: none;
	}

	ion-header {
		--background: #FFFFFF;
		--box-shadow: none;
	}
</style>
