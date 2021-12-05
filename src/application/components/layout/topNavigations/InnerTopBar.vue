<template>
	<!-- Small screens -->
	<ion-header class=" headerShadow ion-no-border">
		<ion-toolbar class="px-4 block md:hidden">
			<ion-buttons slot="start" @click="$router.go(-1)">
				<ion-icon :icon="arrowBackOutline" class="text-[23px] text-main_dark"></ion-icon>
			</ion-buttons>
			<ion-title class="mx-auto text-base font-bold text-main_dark">
				{{ $route.meta.displayName ?? '' }}
			</ion-title>
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

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/vue'
import { arrowBackOutline, close, notifications, search } from 'ionicons/icons'
import BigScreenBar from './screens/BigScreenBar.vue'
import SearchBar from '@app/components/search/SearchBar.vue'

export default defineComponent({
	components: { IonIcon, SearchBar, IonHeader, IonToolbar, BigScreenBar, IonTitle, IonButtons },
	setup () {

		const showSearch = ref(false)
		const toggleSearch = () => {
			showSearch.value = !showSearch.value
		}
		return {
			close, arrowBackOutline,
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
