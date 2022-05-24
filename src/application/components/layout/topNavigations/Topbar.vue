<template>
	<ion-header class="block ion-no-border inset-x-0 w-full lg:shadow-md z-10">
		<ion-toolbar class="lg:hidden bg-headerBg px-4 border-bottom-line md:h-auto min-h-[3rem] flex items-center justify-center">
		
			<div class="flex items-center justify-center">
				<!-- TODO: Only show back button if there is a previous page & it's not the homePage -->
				<ion-icon v-if="true" :icon="arrowBackOutline" class="text-xl text-headerText absolute left-0" @click="$router.go(-1)" />
				<router-link to="/">
					<IonText class="font-bold text-headerText text-heading">
						{{ $route.meta.displayName ?? 'Stranerd' }}
					</IonText>
				</router-link>
				<!-- <div class="flex items-center">
					<ion-icon :icon="addCircleOutline" class="text-xl text-headerText mr-6"
						@click="openCreateDashboardMenu" />
					<router-link class="flex items-center"
						exact-active-class="!text-headerText"
						to="/search">
						<ion-icon :icon="searchOutline" class="text-xl text-headerText mr-6" />
					</router-link>
					<router-link class="flex items-center" to="/notifications">
						<NotificationIcon :key="user?.id" class="text-xl text-headerText mr-6" />
					</router-link>
					<Avatar v-if="isLoggedIn" :name="user?.bio.fullName" :size="24" :src="user?.bio.photo"
						@click="openUserDashboardMenu" />
					<router-link v-else class="flex items-center" to="/account">
						<Avatar :size="24" />
					</router-link>
				</div> -->
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
import { addCircleOutline, searchOutline, arrowBackOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useMenuPopover } from '@app/composable/core/modals'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'Topbar',
	components: { IonHeader, IonToolbar, BigScreenBar, NotificationIcon },
	setup () {
		const { isLoggedIn, user } = useAuth()
		const openUserDashboardMenu = useMenuPopover().openUserDashboardMenu
		const openCreateDashboardMenu = useMenuPopover().openCreateDashboardMenu
		return { user, isLoggedIn, openUserDashboardMenu, openCreateDashboardMenu, addCircleOutline, searchOutline, arrowBackOutline }
	}
})
</script>

<style lang="scss" scoped>
	ion-toolbar {
		--background: #{$color-headerBg};
		--box-shadow: none;
	}

	ion-header {
		--background: #{$color-headerBg};
		--box-shadow: none;
	}
</style>
