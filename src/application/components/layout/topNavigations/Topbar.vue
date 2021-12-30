<template>
	<div>
		<ion-header class="block ion-no-border z-40 inset-x-0 w-full top-0 lg:shadow-md">
			<ion-toolbar class="lg:hidden bg-white px-4 border-0 h-12 flex items-center justify-center">
				<div class="flex items-center justify-between">
				
					<avatar v-if="isLoggedIn" :size="24" :src="user?.avatar"
						@click="openUserDashboardMenu" />
					<router-link v-else class="flex items-center" to="/account">
						<avatar :size="24" :src="user?.avatar" />
					</router-link>
					<router-link class="flex items-center" to="/">
						<img class="w-24" src="@app/assets/images/logo/logo-dark.svg" />
					</router-link>
					<router-link to="/notifications">
						<ion-icon :icon="notifications" class="text-xl text-main_dark" />
					</router-link>
				</div>
			</ion-toolbar>

		
			<BigScreenBar />
		</ion-header>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonHeader, IonIcon, IonToolbar } from '@ionic/vue'
import {  ellipsisVertical, notifications, search } from 'ionicons/icons'
import BigScreenBar from './screens/BigScreenBar.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useMenuPopover } from '@app/composable/core/modals'

export default defineComponent({
	name: 'Topbar',
	components: { IonIcon,  IonHeader, IonToolbar, BigScreenBar },
	setup () {
		const { isLoggedIn, user } = useAuth()
		const openUserDashboardMenu = useMenuPopover().openUserDashboardMenu

		return {
			user, isLoggedIn, 
			 search, notifications, openUserDashboardMenu,
			ellipsisVertical
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
