<template>
	<div>

		<ion-header class="block md:hidden ion-no-border">
			<ion-toolbar
				class="md:hidden bg-[#F7F7FC] px-4 flex border-0 items-center justify-between items-center z-50">
				<router-link slot="start" class="flex flex-row items-center mr-4" to="/account">
					<avatar :id="user?.id" :size="30" :src="user?.avatar" />
				</router-link>
				<router-link slot="start" class="flex flex-row items-center " to="/notifications">
					<ion-icon :icon="notifications" class="text-2xl text-icon_inactive"></ion-icon>
				</router-link>

				<div class="flex flex-row items-center px-3 w-[75%] mx-auto justify-center" />

				<router-link slot="end" class="flex items-center justify-end mr-4" to="/users/leaderboard">
					<ion-icon :icon="school" class="text-2xl text-icon_inactive"></ion-icon>
				</router-link>
				<div slot="end" class="flex items-center justify-end ">
					<IonIcon :icon="showSearch ? close : search" class="text-2xl text-icon_inactive"
						@click="toggleSearch" />
				</div>

				<search-bar v-if="showSearch" class="absolute -left-3 z-50 top-1" />
			</ion-toolbar>
		</ion-header>

		<!-- medium screens -->
		<div
			class="hidden lg:hidden md:flex bg-white py-3 px-3 items-center z-50">
			<div class="flex flex-row items-center gap-9 w-1/4">
				<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center "
					to="/account">
					<avatar :id="user?.id" :size="26" :src="user?.avatar" />
				</router-link>

				<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
					<ion-icon :icon="school" class="text-2xl text-icon_inactive"></ion-icon>
				</div>

			</div>

			<div class="flex flex-row items-center px-6 w-2/4 justify-center" />


			<div class="flex flex-row items-center justify-end gap-9 w-1/4">
				<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
					to="/notifications">
					<ion-icon :icon="notifications" class="text-2xl text-icon_inactive"></ion-icon>

				</router-link>

				<div class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center">
					<search-bar v-if="showSearch" class="absolute left-0" />
					<ion-icon :icon="showSearch ? close : search" class="text-2xl text-icon_inactive"
						@click="toggleSearch"></ion-icon>
				</div>

			</div>
		</div>

		<!-- large screens -->
		<div
			class="hidden md:hidden lg:flex bg-white py-3 pl-16 pr-[3rem] items-center gap-16 z-50">
			<div class="w-3/4 flex flex-row items-center py-1 gap-6 justify-between">
				<search-bar class="flex-grow" />

				<router-link class="px-4 py-2 bg-primary text-white rounded-lg flex items-center"
					to="/questions/create">
					<IonIcon :icon="add" class="text-xl" />
				</router-link>

				<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
					to="/notifications">
					<img class="inline h-5" src="@app/assets/images/icons/bell.svg" />
				</router-link>

				<router-link class="py-2 px-3 rounded-md bg-light_gray flex flex-row items-center justify-center"
					to="/account">
					<avatar :id="user?.id" :size="26" :src="user?.avatar" />
				</router-link>
			</div>
			<div class="w-1/4 flex flex-row items-center py-1 px-2" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonHeader, IonIcon, IonToolbar } from '@ionic/vue'
import { add, close, home, notifications, school, search } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import Avatar from '@app/components/core/Avatar.vue'
import SearchBar from '@app/components/search/SearchBar.vue'

export default defineComponent({
	components: { IonIcon, Avatar, SearchBar, IonHeader, IonToolbar },
	setup () {
		const { user } = useAuth()
		const showSearch = ref(false)
		const toggleSearch = () => {
			showSearch.value = !showSearch.value
		}
		return {
			add,
			close,
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
		--background: #F7F7FC;
		--box-shadow: none;
	}

	ion-header {
		--background: #F7F7FC;
		--box-shadow: none;
	}
</style>
