<template>
	<ion-header class="headerShadow ion-no-border">
		<!-- Small screens -->
		<ion-toolbar class="flex md:hidden bg-white px-4 items-center">
			<div class="flex items-center justify-between">
				<template v-if="showSearch">
					<search-bar class="flex-grow" />
				</template>
				<template v-else>
					<ion-icon :icon="chevronBack" class="text-[23px] text-main_dark" @click="$router.go(-1)" />
					<ion-title class="mx-auto text-base font-bold text-main_dark">
						{{ $route.meta.displayName ?? '' }}
					</ion-title>
				</template>
				<div class="flex items-center gap-4 ml-4">
					<IonIcon :icon="showSearch ? close : search" class="text-xl text-main_dark mr-4"
						@click="toggleSearch" />
					<div v-if="isLoggedIn"
						class=" font-bold flex flex-row items-center justify-center gap-2 cursor-pointer"
						@click="openUserDashboardMenu()"
					>
						<ion-icon :icon="ellipsisVertical" class="text-xl text-main_dark"></ion-icon>
					</div>
				</div>
			</div>
		</ion-toolbar>

		<!-- medium screens -->
		<ion-toolbar
			class="hidden lg:hidden md:flex bg-white px-3 items-center border-0 z-50">
			<div class="flex items-center justify-between">
				<template v-if="showSearch">
					<search-bar class="flex-grow" />
				</template>
				<template v-else>
					<router-link class="flex items-center " to="/notifications">
						<ion-icon :icon="notifications" class="text-xl text-main_dark"></ion-icon>
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
						@click="openUserDashboardMenu()">
						<ion-icon :icon="ellipsisVertical" class="text-xl text-main_dark"></ion-icon>
					</div>
				</div>
			</div>
		</ion-toolbar>

		<!-- large screens -->
		<BigScreenBar />
	</ion-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/vue'
import { chevronBack, close, ellipsisVertical, notifications, search } from 'ionicons/icons'
import BigScreenBar from './screens/BigScreenBar.vue'
import SearchBar from '@app/components/search/SearchBar.vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { useMenuPopover } from '@app/composable/core/modals'

export default defineComponent({
	name: 'InnerTopBar',
	components: { IonIcon, SearchBar, IonHeader, IonToolbar, BigScreenBar, IonTitle },
	setup () {
		const { isLoggedIn } = useAuth()
		const openUserDashboardMenu = () => useMenuPopover().openUserDashboardMenu()
		const route = useRoute()
		const showSearch = ref(route.path.startsWith('/search'))
		const toggleSearch = async () => {
			showSearch.value = !showSearch.value
		}
		return {
			isLoggedIn, openUserDashboardMenu,
			showSearch, toggleSearch,
			close, chevronBack, ellipsisVertical, search, notifications
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
