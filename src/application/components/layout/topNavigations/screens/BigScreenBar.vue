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
						<!-- <router-link class="py-2 flex items-center relative"
									to="/questions/create"> -->

						<!-- <ion-card class="w-24 px-4 py-6 top-full absolute z-50">	   -->
						<ion-icon :icon="addCircle" class="text-2xl text-main_dark"
							@click="setStudyPopover(true, $event)" />
						<ion-popover
							:event="event"
							:is-open="isOpenStudyPopover"
							:showBackdrop="false"
							:translucent="true"
							class="mt-5"
							css-class="my-custom-class"
							@didDismiss="setStudyPopover(false)"
						>
							<!-- <Popover></Popover> -->
							<div>
								<ion-content>
									<div class="mx-auto py-3 flex flex-col">
										<div
											class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark cursor-pointer"
											@click="createSet">
											<div class="w-48 flex items-center gap-3">
												<ion-icon :icon="folder" class="text-2xl"></ion-icon>
												<ion-label class="font-bold">Create a study set</ion-label>
											</div>

										</div>
										<!-- <div class="flex items-center gap-2 w-full">
												</div> -->
										<router-link class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
											to="/study/flashCards/create">
											<div class="w-48 flex items-center gap-3">
												<img alt="" class="w-6" src="@app/assets/images/icons/flashCardNav.svg">
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
						<div class=" font-bold flex flex-row items-center justify-center gap-2 cursor-pointer"
							@click="setMenuPopover(true, $event)"
						>
							<avatar :id="user?.id" :size="24" :src="user?.avatar" />
							<span class="text-base text-main_dark w-[6.5rem]">{{
								user?.fullName ? user.fullName : 'Anonymous'
							}}</span>
							<ion-icon :icon="chevronDown" class="text-xl text-main_dark"></ion-icon>
						</div>

						<ion-popover
							:event="event"
							:is-open="isOpenMenuPopover"
							:showBackdrop="false"
							:translucent="true"
							class="mt-5"
							@didDismiss="setMenuPopover(false)"
						>
							<!-- <Popover></Popover> -->
							<div>
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
										<router-link :to="`/users/${user?.id}/settings`"
											class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark">
											<div class="w-48 flex items-center gap-3">
												<ion-icon :icon="settings" class="text-3xl"></ion-icon>
												<ion-label class="font-bold">Settings</ion-label>
											</div>

										</router-link>
										<div class="py-2 my-2 mx-auto flex gap-4 items-center text-main_dark"
											@click="signout()">
											<div class="w-48 flex items-center gap-3">
												<ion-icon :icon="logOut" class="text-3xl"></ion-icon>
												<ion-label class="font-bold">LogOut</ion-label>
											</div>

										</div>
									</div>
								</ion-content>
							</div>
						</ion-popover>
					</div>
				</div>
			</div>
		</div>

	</ion-toolbar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonIcon, IonPopover, IonToolbar } from '@ionic/vue'
import {
	addCircle,
	chevronDown,
	folder,
	helpCircle,
	library,
	logOut,
	notifications,
	person,
	podium,
	settings
} from 'ionicons/icons'
import SearchBar from '@app/components/search/SearchBar.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'BigScreeBar',
	components: { IonPopover, IonIcon, SearchBar, IonToolbar },

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
		const { user, signout } = useAuth()
		const showSearch = ref(false)

		const createSet = () => {
			useStudyModal().openCreateSet()
		}

		return {
			isOpenMenuPopover, isOpenStudyPopover, signout,
			setMenuPopover, setStudyPopover, createSet,
			event, addCircle, helpCircle, chevronDown,
			folder, library, settings, logOut,
			person, podium, user, notifications
		}
	}

})
</script>

<style>

</style>
