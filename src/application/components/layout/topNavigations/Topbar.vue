<template>
	<div>
		<ion-header class="block ion-no-border z-40 inset-x-0 w-full top-0 lg:shadow-md ">
			<ion-toolbar
				class="md:hidden bg-white px-4 border-0 h-12 flex items-center justify-center">
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
				class="hidden lg:hidden md:flex bg-white px-3 items-center border-0 z-50">
				<div class="flex items-center justify-between">
					<router-link class="flex items-center " to="/notifications">
						<ion-icon :icon="notifications" class="text-xl text-main_dark"></ion-icon>
					</router-link>
					<router-link class="flex items-center" to="/dashboard">
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
			<BigScreenBar />

		</ion-header>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonHeader, IonIcon, IonToolbar } from '@ionic/vue'
import { close, notifications, search } from 'ionicons/icons'
import BigScreenBar from './screens/BigScreenBar.vue'
import SearchBar from '@app/components/search/SearchBar.vue'

export default defineComponent({
	components: { IonIcon, SearchBar, IonHeader, IonToolbar, BigScreenBar },
	setup () {

		const showSearch = ref(false)
		const toggleSearch = () => {
			showSearch.value = !showSearch.value
		}
		return {
			close,
			showSearch, toggleSearch,
			search, notifications
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
