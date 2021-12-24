<template>
	<div>
		<ion-header class="block ion-no-border z-40 inset-x-0 w-full top-0 lg:shadow-md">
			<ion-toolbar class="md:hidden bg-white px-4 border-0 h-12 flex items-center justify-center">
				<div class="flex items-center justify-between">
					<template v-if="showSearch">
						<search-bar class="flex-grow" />
					</template>
					<template v-else>
						<avatar v-if="isLoggedIn" :size="24" :src="user?.avatar"
							@click="openUserDashboardMenu" />
						<router-link v-else class="flex items-center" to="/account">
							<avatar :size="24" :src="user?.avatar" />
						</router-link>
						<router-link class="flex items-center" to="/">
							<img class="w-24" src="@app/assets/images/logo/logo-dark.svg" />
						</router-link>
					</template>
					<IonIcon :icon="showSearch ? close : search" class="text-xl text-main_dark ml-4"
						@click="toggleSearch" />
				</div>
			</ion-toolbar>

			<!-- medium screens -->
			<ion-toolbar class="hidden lg:hidden md:flex bg-white px-3 items-center border-0 z-50">
				<div class="flex items-center justify-between">
					<template v-if="showSearch">
						<search-bar class="flex-grow" />
					</template>
					<template v-else>
						<router-link class="flex items-center " to="/notifications">
							<ion-icon :icon="notifications" class="text-xl text-main_dark" />
						</router-link>
						<router-link class="flex items-center" to="/dashboard">
							<img class="w-24" src="@app/assets/images/logo/logo-dark.svg" />
						</router-link>
					</template>
					<div class="flex items-center gap-4 ml-4">
						<IonIcon :icon="showSearch ? close : search" class="text-xl text-main_dark mr-4"
							@click="toggleSearch" />
						<div v-if="isLoggedIn"
							class=" font-bold flex flex-row items-center justify-center gap-2 cursor-pointer"
							@click="openUserDashboardMenu">
							<ion-icon :icon="ellipsisVertical" class="text-xl text-main_dark"></ion-icon>
						</div>
					</div>
				</div>
			</ion-toolbar>

			<!-- large screens -->
			<BigScreenBar />
		</ion-header>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonHeader, IonIcon, IonToolbar } from '@ionic/vue'
import { close, ellipsisVertical, notifications, search } from 'ionicons/icons'
import BigScreenBar from './screens/BigScreenBar.vue'
import SearchBar from '@app/components/search/SearchBar.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useRoute } from 'vue-router'
import { useMenuPopover } from '@app/composable/core/modals'

export default defineComponent({
	name: 'Topbar',
	components: { IonIcon, SearchBar, IonHeader, IonToolbar, BigScreenBar },
	setup () {
		const { isLoggedIn, user } = useAuth()
		const openUserDashboardMenu = useMenuPopover().openUserDashboardMenu
		const route = useRoute()
		const showSearch = ref(route.path.startsWith('/search'))
		const toggleSearch = async () => {
			showSearch.value = !showSearch.value
		}
		return {
			user, isLoggedIn, showSearch, toggleSearch,
			close, search, notifications, openUserDashboardMenu,
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
