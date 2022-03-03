<template>
	<ion-header class="block ion-no-border z-40 inset-x-0 w-full lg:shadow-md">
		<ion-toolbar class="lg:hidden bg-white px-4 border-bottom-line md:h-auto flex items-center justify-center">
			<div class="flex items-center justify-between">
				<router-link to="/">
					<IonText class="font-bold text-main_dark">
						{{ $route.meta.displayName ?? 'Stranerd' }}
					</IonText>
				</router-link>

				<div class="flex items-center">

					<ion-icon :icon="addCircleOutline" class="text-xl text-main_dark mr-6"
						@click="openCreateDashboardMenu" />
					<router-link class="flex items-center"
						exact-active-class="!text-main_dark"
						to="/search">
						<ion-icon :icon="searchOutline" class="text-xl text-main_dark mr-6" />
					</router-link>
					<router-link class="flex items-center" to="/notifications">
						<NotificationIcon :key="user?.id" class="text-xl text-main_dark mr-6" />
					</router-link>
					<Avatar v-if="isLoggedIn" :name="user?.bio.firstName" :size="24" :src="user?.avatar"
						@click="openUserDashboardMenu" />
					<router-link v-else class="flex items-center" to="/account">
						<Avatar :size="24" />
					</router-link>
				</div>
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
import { addCircleOutline, searchOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useMenuPopover } from '@app/composable/core/modals'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'

export default defineComponent({
	name: 'Topbar',
	components: { IonHeader, IonToolbar, BigScreenBar, NotificationIcon },
	setup () {
		const { isLoggedIn, user } = useAuth()
		const openUserDashboardMenu = useMenuPopover().openUserDashboardMenu
		const openCreateDashboardMenu = useMenuPopover().openCreateDashboardMenu
		return { user, isLoggedIn, openUserDashboardMenu, openCreateDashboardMenu, addCircleOutline, searchOutline }
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
