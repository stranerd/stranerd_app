<template>
	<ion-header class="headerShadow ion-no-border">
		<!-- Small screens -->
		<ion-toolbar class="flex md:hidden bg-white px-2 items-center">
			<div class="flex items-center justify-between">
				<ion-icon :icon="chevronBack" class="text-[23px] text-main_dark" @click="$router.go(-1)" />
				<ion-title class="text-base font-bold text-main_dark">
					{{ $route.meta.displayName ?? '' }}
				</ion-title>
				<Avatar v-if="isLoggedIn" :size="24" :src="user?.avatar"
					@click="openUserDashboardMenu" />
				<router-link v-else class="flex items-center" to="/account">
					<Avatar :size="24" :src="user?.avatar" />
				</router-link>
			</div>
		</ion-toolbar>

		<!-- medium screens -->
		<ion-toolbar
			class="hidden lg:hidden md:flex bg-white px-2 items-center border-0 z-50">
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
import { IonHeader, IonTitle, IonToolbar } from '@ionic/vue'
import { chevronBack, close, ellipsisVertical, search } from 'ionicons/icons'
import BigScreenBar from './screens/BigScreenBar.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useMenuPopover } from '@app/composable/core/modals'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'

export default defineComponent({
	name: 'InnerTopBar',
	components: { IonHeader, IonToolbar, BigScreenBar, IonTitle, NotificationIcon },
	setup () {
		const { isLoggedIn, user } = useAuth()
		const openUserDashboardMenu = useMenuPopover().openUserDashboardMenu

		return {
			isLoggedIn, user, openUserDashboardMenu,
			close, chevronBack, ellipsisVertical, search
		}
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
