<template>
	<div>
		<ion-header class="block ion-no-border lg:shadow-md">
			<ion-toolbar
				class="md:hidden bg-white px-4 border-0 z-50">
				<div class="flex items-center justify-between">
					<router-link class="flex items-center " to="/notifications">
						<ion-icon :icon="notifications" class="text-xl text-main_dark"></ion-icon>
					</router-link>
					<router-link class="flex items-center" to="/users/leaderboard">
						<img class="w-24" src="@app/assets/images/logo/logo-dark.svg" />
					</router-link>
					<div class="flex items-center ">
						<IonIcon :icon="showSearch ? close : search" class="text-xl text-main_dark"
							@click="toggleSearch" />
					</div>	
					<search-bar v-if="showSearch" class="absolute -left-3 z-50 top-1" />
				</div>		
			</ion-toolbar>

			<!-- medium screens -->
			<ion-toolbar
				class="hidden lg:hidden md:flex bg-white py-3 px-3 items-center border-0 z-50">
				<div class="flex items-center justify-between">
					<router-link class="flex items-center " to="/notifications">
						<ion-icon :icon="notifications" class="text-xl text-main_dark"></ion-icon>
					</router-link>
					<router-link class="flex items-center" to="/users/leaderboard">
						<img class="w-24" src="@app/assets/images/logo/logo-dark.svg" />
					</router-link>
					<div class="flex items-center ">
						<IonIcon :icon="showSearch ? close : search" class="text-xl text-main_dark"
							@click="toggleSearch" />
					</div>	
					<search-bar v-if="showSearch" class="absolute -left-3 z-50 top-1" />
				</div>		
			</ion-toolbar>

			<!-- large screens -->
			<ion-toolbar
				class="hidden lg:flex px-4 border-0 z-50">
				<ion-grid>
					<ion-row class="items-center gap-10">
						<ion-col>
							<router-link class="flex items-center" to="/users/leaderboard">
								<img class="w-32" src="@app/assets/images/logo/logo-dark.svg" />
							</router-link>
						</ion-col>
						<ion-col size="7">
							<search-bar class="flex-grow" />
						</ion-col>
						<ion-col>
							<div class="flex flex-row items-center py-1 gap-6 justify-between">
								<router-link class="py-2 flex items-center"
									to="/questions/create">
									<!-- <IonIcon :icon="add-circle" class="text-xl text-main_dark" /> -->
									<ion-icon :icon="addCircle" class="text-xl text-main_dark"></ion-icon>
								</router-link>		
								<router-link class="py-2 flex flex-row items-center justify-center"
									to="/notifications">
									<ion-icon :icon="notifications" class="text-xl text-main_dark"></ion-icon>
									<!-- <img class="inline h-5" src="@app/assets/images/icons/bell.svg" /> -->
								</router-link>		
								<router-link class="py-2 font-bold flex flex-row items-center justify-center gap-2"
									to="/account">
									<avatar :id="user?.id" :size="26" :src="user?.avatar" />
									<span class="text-base text-main_dark">Timmy Neutron</span>
									<ion-icon :icon="chevronDown" class="text-xl text-main_dark"></ion-icon>
								</router-link>
							</div>
						</ion-col>
					</ion-row>

					<!-- <ion-row class="ion-align-items-center"> -->
				</ion-grid>	
			</ion-toolbar>
		</ion-header>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { } from '@ionic/vue'
import { IonHeader, IonIcon, IonToolbar, IonCol, IonGrid, IonRow } from '@ionic/vue'
import { addCircle, close, home, notifications, school, search, chevronDown } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import Avatar from '@app/components/core/Avatar.vue'
import SearchBar from '@app/components/search/SearchBar.vue'

export default defineComponent({
	components: { IonIcon, Avatar, SearchBar, IonHeader, IonToolbar, IonCol, IonGrid, IonRow },
	setup () {
		const { user } = useAuth()
		const showSearch = ref(false)
		const toggleSearch = () => {
			showSearch.value = !showSearch.value
		}
		return {
			addCircle,
			close,
			chevronDown,
			showSearch,
			toggleSearch,
			home,
			user,
			search,
			school,
			notifications
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
