<template>
	<ion-toolbar
		class="hidden lg:flex border-0 z-50">
		<div class="flex items-center">
			<div class="w-[16%]">
				<router-link class="flex items-center w-full justify-center" to="/dashboard">
					<img class="w-40" src="@app/assets/images/logo/logo-dark.svg" />
				</router-link>
			</div>
			<div class="flex w-[84%] gap-10 px-12">
				<div class="w-3/4 flex-auto flex flex-row items-center">
					<search-bar class="flex-grow" />
				</div>
				<div class="w-1/4 flex-auto flex">
					<div class="flex flex-row items-center py-1 gap-6 justify-between m-auto">
						<ion-icon :icon="addCircle" class="text-2xl text-main_dark"
							@click="openCreateDashboardMenu()" />
						<router-link class=" flex flex-row items-center justify-center"
							to="/notifications">
							<ion-icon :icon="notifications" class="text-2xl text-main_dark"></ion-icon>
						</router-link>
						<div v-if="isLoggedIn"
							class=" font-bold flex flex-row items-center justify-center gap-2 cursor-pointer"
							@click="openUserDashboardMenu()"
						>
							<avatar :id="user.id" :size="24" :src="user.avatar" />
							<span class="text-base text-main_dark max-w-[6.5rem]">
								{{ user.fullName }}
							</span>
							<ion-icon :icon="chevronDown" class="text-xl text-main_dark"></ion-icon>
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
import { IonIcon, IonToolbar } from '@ionic/vue'
import { addCircle, chevronDown, notifications } from 'ionicons/icons'
import SearchBar from '@app/components/search/SearchBar.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useMenuPopover } from '@app/composable/core/modals'

export default defineComponent({
	name: 'BigScreenBar',
	components: { IonIcon, SearchBar, IonToolbar },
	setup () {
		const openCreateDashboardMenu = useMenuPopover().openCreateDashboardMenu
		const openUserDashboardMenu = useMenuPopover().openUserDashboardMenu
		const { isLoggedIn, user, signout } = useAuth()

		return {
			openCreateDashboardMenu, openUserDashboardMenu,
			addCircle, chevronDown, notifications,
			isLoggedIn, user, signout
		}
	}

})
</script>
