<template>
	<ion-header class="block ion-no-border z-40 inset-x-0 w-full top-0 lg:shadow-md">
		<ion-toolbar class="lg:hidden bg-white px-2 border-0 h-12 md:h-auto flex items-center justify-center">
			<div class="flex items-center justify-between">
				<Avatar v-if="isLoggedIn" :size="24" :src="user?.avatar"
					@click="openUserDashboardMenu" />
				<router-link v-else class="flex items-center" to="/account">
					<Avatar :size="24" :src="user?.avatar" />
				</router-link>
				<router-link class="flex items-center" to="/">
					<img class="w-24" src="@app/assets/images/logo/logo-dark.svg" />
				</router-link>
				<router-link class="flex items-center" to="/notifications">
					<IonIcon :icon="notifications" class="text-xl text-main_dark" />
				</router-link>
			</div>
		</ion-toolbar>

		<!-- large screens -->
		<BigScreenBar />
	</ion-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonHeader, IonIcon, IonToolbar } from '@ionic/vue'
import { notifications } from 'ionicons/icons'
import BigScreenBar from './screens/BigScreenBar.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useMenuPopover } from '@app/composable/core/modals'

export default defineComponent({
	name: 'Topbar',
	components: { IonIcon, IonHeader, IonToolbar, BigScreenBar },
	setup () {
		const { isLoggedIn, user } = useAuth()
		const openUserDashboardMenu = useMenuPopover().openUserDashboardMenu
		return { user, isLoggedIn, notifications, openUserDashboardMenu }
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
