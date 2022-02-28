<template>
	<ion-toolbar class="hidden lg:flex border-0 z-50 h-20">
		<div class="flex items-center">
			<div class="w-[16%]">
				<router-link class="flex items-center w-full justify-center" to="/">
					<Logo :secondary="true" class="w-40" />
				</router-link>
			</div>
			<div class="flex w-[84%] gap-10 px-12">	
				<div class="w-3/4 flex-auto flex flex-row items-center">
					<Search class="flex-grow" />
				</div>
				<div class="w-[25%] flex-auto flex">
					<div class="flex flex-row items-center py-1 gap-8 justify-between">
						<ion-icon :icon="addCircleOutline" class="text-2xl text-main_dark"
							@click="openCreateDashboardMenu" />
						<router-link class="flex flex-row items-center justify-center"
							to="/notifications">
							<NotificationIcon :key="user?.id" class="text-2xl text-main_dark" />
						</router-link>
						<div v-if="isLoggedIn"
							class=" font-bold flex flex-row items-center justify-center gap-2 cursor-pointer"
							@click="openUserDashboardMenu"
						>
							<avatar :size="24" :src="user.avatar" />
							<span class="text-base text-main_dark truncate max-w-[150px] flex items-center gap-1">
								<span>{{ user.fullName }}</span>
								<IonIcon v-if="user.isVerified" :icon="checkmarkCircleOutline" color="primary" />
							</span>
							<ion-icon :icon="chevronDownOutline" class="text-xl text-main_dark"></ion-icon>
						</div>
						<router-link v-else to="/auth/signin">
							<avatar :size="24" />
						</router-link>
					</div>
				</div>
			</div>
		</div>
	</ion-toolbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonToolbar } from '@ionic/vue'
import { addCircleOutline, checkmarkCircleOutline, chevronDownOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useMenuPopover } from '@app/composable/core/modals'
import Search from '@app/components/search/Search.vue'
import NotificationIcon from '@app/components/users/notifications/NotificationIcon.vue'

export default defineComponent({
	name: 'BigScreenBar',
	components: { Search, IonToolbar, NotificationIcon },
	setup () {
		const openCreateDashboardMenu = useMenuPopover().openCreateDashboardMenu
		const openUserDashboardMenu = useMenuPopover().openUserDashboardMenu
		const { isLoggedIn, user, signout } = useAuth()

		return {
			openCreateDashboardMenu, openUserDashboardMenu,
			addCircleOutline, chevronDownOutline, checkmarkCircleOutline,
			isLoggedIn, user, signout
		}
	}
})
</script>

<style lang="scss" scoped>
	:deep(ion-searchbar) {
		--background: $color-newGray !important;
		background: $color-newGray !important;
	}
</style>
