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
								<!-- <router-link class="py-2 flex items-center relative"
									to="/questions/create"> -->
									
								<!-- <ion-card class="w-24 px-4 py-6 top-full absolute z-50">	   -->
								<ion-icon :icon="addCircle" class="text-2xl text-main_dark" @click="setStudyPopover(true, $event)" />
								<ion-popover
									:is-open="isOpenStudyPopover"
									css-class="my-custom-class"
									:event="event"
									:translucent="true"
									:showBackdrop="false"
									@didDismiss="setStudyPopover(false)"
									class="mt-5"
								>
									<!-- <Popover></Popover> -->
									<div >
										<ion-content>
											<div class="mx-auto py-3 flex flex-col">
												<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
													to="/study">
													<div class="w-48 flex items-center gap-3">
														<ion-icon :icon="folder" class="text-2xl"></ion-icon>
														<ion-label class="font-bold">Create a study set</ion-label>
													</div>
												
												</router-link>	
												<!-- <div class="flex items-center gap-2 w-full">
												</div> -->
												<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
													to="/notifications">
													<div class="w-48 flex items-center gap-3">
														<img src="@app/assets/images/icons/flashCardNav.svg" class="w-6" alt="">
														<ion-label class="font-bold">Create a flashcard</ion-label>
													</div>
												
												</router-link>
												<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
													to="/questions/create">
													<div class="w-48 flex items-center gap-3">
														<ion-icon :icon="helpCircle" class="text-3xl"></ion-icon>
														<ion-label class="font-bold">Ask a question</ion-label>
													</div>
												
												</router-link>
											</div>
										</ion-content>
									</div>
								</ion-popover>
								<router-link class=" flex flex-row items-center justify-center"
									to="/notifications">
									<ion-icon :icon="notifications" class="text-2xl text-main_dark"></ion-icon>
								</router-link>		
								<div class=" font-bold flex flex-row items-center justify-center gap-2 cursor-pointer"  @click="setMenuPopover(true, $event)"
								>
									<avatar :id="user?.id" :size="24" :src="user?.avatar" />
									<span class="text-base text-main_dark w-[6.5rem]">{{user?.fullName}}</span>
									<ion-icon :icon="chevronDown" class="text-xl text-main_dark"></ion-icon>
								</div>

								<ion-popover
									:is-open="isOpenMenuPopover"
									:event="event"
									:translucent="true"
									:showBackdrop="false"
									@didDismiss="setMenuPopover(false)"
									class="mt-5"
								>
									<!-- <Popover></Popover> -->
									<div >
										<ion-content>
											<div class="mx-auto py-3 flex flex-col">
												<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
													to="/account">
													<div class="w-48 flex items-center gap-3">
														<ion-icon :icon="person" class="text-2xl"></ion-icon>
														<ion-label class="font-bold">Profile</ion-label>
													</div>
												
												</router-link>	
												<!-- <div class="flex items-center gap-2 w-full">
												</div> -->
												<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
													to="/study">
													<div class="w-48 flex items-center gap-3">
														<ion-icon :icon="library" class="text-2xl"></ion-icon>
														<ion-label class="font-bold">Study</ion-label>
													</div>
												
												</router-link>
												<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
													to="/users/leaderboard">
													<div class="w-48 flex items-center gap-3">
														<ion-icon :icon="podium" class="text-3xl"></ion-icon>
														<ion-label class="font-bold">LeaderBoard</ion-label>
													</div>
												
												</router-link>
												<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
													:to="`/users/${user.id}/settings`">
													<div class="w-48 flex items-center gap-3">
														<ion-icon :icon="settings" class="text-3xl"></ion-icon>
														<ion-label class="font-bold">Settings</ion-label>
													</div>
												
												</router-link>
												<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
													to="/users/leaderboard">
													<div class="w-48 flex items-center gap-3">
														<ion-icon :icon="logOut" class="text-3xl"></ion-icon>
														<ion-label class="font-bold">LogOut</ion-label>
													</div>
												
												</router-link>
											</div>
										</ion-content>
									</div>
								</ion-popover>
							</div>
						</div>
					</div>
				</div>
	
			</ion-toolbar>
		</ion-header>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { } from '@ionic/vue'
import { IonHeader, IonIcon, IonToolbar,  IonPopover  } from '@ionic/vue'
// import { IonHeader, IonIcon, IonToolbar, IonCol, IonGrid, IonRow } from '@ionic/vue'
import { addCircle, helpCircle, folder, personCircle, close, home, notifications, school, search, chevronDown, person, library, podium, settings, logOut } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
// import Avatar from '@app/components/core/Avatar.vue'
import SearchBar from '@app/components/search/SearchBar.vue'
// import Popver from './popover.vue'

export default defineComponent({
	// components: { IonIcon, Avatar, SearchBar, IonHeader, IonToolbar, IonCol, IonGrid, IonRow },
	components: {  IonPopover, IonIcon, SearchBar, IonHeader, IonToolbar },
	setup () {
		const isOpenStudyPopover = ref(false)
		const isOpenMenuPopover = ref(false)
		const event = ref()
		const setMenuPopover = (state: boolean, ev?: Event) => {
			event.value = ev 
			isOpenMenuPopover.value = state
		}
		const setStudyPopover = (state: boolean, ev?: Event) => {
			event.value = ev 
			isOpenStudyPopover.value = state
		}
		const { user } = useAuth()
		const showSearch = ref(false)
		const toggleSearch = () => {
			showSearch.value = !showSearch.value
		}
		return {
			isOpenMenuPopover,
			isOpenStudyPopover, 
			setMenuPopover,
			setStudyPopover, 
			event,
			addCircle,
			helpCircle, 
			folder,
			library,
			 settings, logOut,
			person,
			personCircle,
			podium,
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
