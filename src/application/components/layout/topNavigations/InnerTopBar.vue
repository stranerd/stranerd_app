<template>
	<!-- Small screens -->
	<ion-header class="block md:hidden">
		<ion-toolbar class="px-2">
			<ion-buttons slot="start" @click="$router.go(-1)">
				<ion-icon :icon="arrowBackOutline" class="text-[23px] text-dark_gray"></ion-icon>
			</ion-buttons>
			<ion-title class="mx-auto text-base font-bold text-dark_gray">
				{{ $route.meta.displayName ?? '' }}
			</ion-title>
		</ion-toolbar>
	</ion-header>

	<!-- medium screens -->
	<div
		class="hidden lg:hidden md:flex bg-white py-3 px-3 w-full flex-row items-center z-50">
		<div class="flex flex-row items-center gap-9 w-1/4">
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center "
				to="/account">
				<avatar :size="26" :src="user?.avatar"/>
			</router-link>


		</div>

		<div class="flex flex-row items-center px-6 w-2/4 justify-center">
			<div class="py-2 px-4 w-full bg-light_gray flex rounded-lg flex-row items-center">
				<div class="w-1/3 flex flex-row items-center">
					<Coins :gold="false" :size="28" class="mr-2 inline"/>
					<span class="font-semibold text-sm text-dark_grey ">{{
						isLoggedIn ? user.account.coins.bronze : '-'
					}}</span>
				</div>
				<div class="w-1/3 flex flex-row items-center justify-center">
					<ion-icon :icon="add" class="text-3xl cursor-pointer text-icon_inactive"
						@click="isLoggedIn ? buyCoins() : null"></ion-icon>


				</div>
				<div class="w-1/3 flex flex-row-reverse items-center">
					<span class="font-semibold text-sm text-dark_grey ">{{
						isLoggedIn ? user.account.coins.gold : '-'
					}}</span>
					<Coins :gold="true" :size="28" class="mr-2 inline"/>
				</div>
			</div>
		</div>


		<div class="flex flex-row items-center justify-end gap-9 w-1/4">
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
				to="/notifications">
				<ion-icon :icon="notifications" class="text-2xl text-icon_inactive"></ion-icon>

			</router-link>

			<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
				<search-bar v-if="showSearch" class="absolute left-0"/>
				<ion-icon :icon="showSearch ? close : search" class="text-2xl text-icon_inactive"
					@click="toggleSearch"></ion-icon>
			</div>

		</div>
	</div>

	<!-- large screens -->
	<div
		class="hidden md:hidden lg:flex bg-white py-3 pl-16 pr-[100px] items-center gap-16 z-50">
		<div class="flex flex-row items-center py-1 gap-3 w-[16%] justify-between">
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
				to="/dashboard">
				<ion-icon :icon="home" class="text-xl text-icon_inactive"></ion-icon>
			</router-link>
			<div class="py-2 px-3 rounded-md flex flex-row items-center justify-center">
				<img class="min-h-[25px] object-fit max-w-[8.9rem]" src="@app/assets/images/icons/logo.svg"/>
			</div>
		</div>
		<div class="w-3/4 flex flex-row items-center py-1 gap-6 justify-around">
			<search-bar/>

			<router-link class="px-4 py-1 bg-primary text-white rounded-lg" to="/questions">
				<div class="flex flex-col py-1 items-center justify-center">
					<ion-icon :icon="add" class="text-xl"></ion-icon>
				</div>
			</router-link>
			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
				to="/notifications">
				<ion-icon :icon="notifications" class="text-xl text-icon_inactive"></ion-icon>
			</router-link>

			<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
				to="/account">
				<avatar :size="26" :src="user?.avatar"/>
			</router-link>
		</div>
		<div class="w-1/4 flex flex-row items-center py-1 -mr-5">
			<div class="py-2 px-4 w-full bg-light_gray flex rounded-lg flex-row items-center">
				<div class="w-1/3 flex flex-row items-center">
					<Coins :gold="false" :size="20" class="mr-2 inline"/>
					<span class="font-semibold text-sm text-dark_grey ">{{
						isLoggedIn ? user.account.coins.bronze : '-'
					}}</span>
				</div>
				<div class="w-1/3 flex flex-row items-center justify-center">
					<ion-icon :icon="add" class="text-xl cursor-pointer"
						@click="isLoggedIn ? buyCoins() : null"></ion-icon>

				</div>
				<div class="w-1/3 flex flex-row-reverse items-center">
					<span class="font-semibold text-sm text-dark_grey ">{{
						isLoggedIn ? user.account.coins.gold : '-'
					}}</span>
					<Coins :gold="true" :size="20" class="mr-2 inline"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/vue'
import { add, arrowBackOutline, close, home, notifications, search } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import Coins from '../../core/Coins.vue'
import Avatar from '@app/components/core/Avatar.vue'
import SearchBar from '@app/components/search/SearchBar.vue'
import { useAccountModal } from '@app/composable/core/modals'

export default defineComponent({
	components: { IonIcon, Avatar, IonButtons, IonHeader, IonToolbar, IonTitle, Coins, SearchBar },
	setup() {

		const { user, isLoggedIn } = useAuth()
		const showSearch = ref(false)
		const toggleSearch = () => {
			showSearch.value = !showSearch.value
		}
		const buyCoins = () => {
			useAccountModal().openBuyCoins()
		}

		return {
			buyCoins,
			isLoggedIn,
			showSearch,
			toggleSearch,
			add,
			home,
			user,
			arrowBackOutline,
			notifications,
			search,
			close
		}
	}

})
</script>

<style lang="scss" scoped>
ion-toolbar {
	--background: #F7F7FC;
	--box-shadow: none;
}

ion-header {
	--background: #F7F7FC;
	--box-shadow: none;
}

ion-title {
	--background: #F7F7FC;
	--box-shadow: none;
	width: fit-content;
	position: relative;
	left: -23px;
}
</style>
