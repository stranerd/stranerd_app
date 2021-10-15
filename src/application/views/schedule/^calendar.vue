<template>
	<ion-page>
		<ion-header mode="ios" class="block lg:hidden">
			<ion-toolbar class="px-2">
				<ion-buttons @click="router.go(-1)" slot="start">
					<ion-icon :icon="arrowBackOutline" class="text-[23px] text-dark_gray"></ion-icon>
				</ion-buttons>
				<ion-title>Schedule</ion-title>
				<ion-buttons slot="end" class=" mr-3" @click="createSchedule()">
					<ion-icon :icon="add" class="text-[23px] text-dark_gray"></ion-icon>
				</ion-buttons>
				<ion-buttons slot="end">
					<ion-icon :icon="calendar" class="text-[24px] text-dark_gray"></ion-icon>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div class="layout-page-notab">
				<div class="layout-body">
					<div class="w-full flex flex-col px-3 col-span-12 text-icon_inactive lg:px-0">
						<div class="flex flex-row items-center md:justify-between mt-1 md:px-2 lg:px-0">
							<span class=" flex-row items-center hidden md:flex px-2 py-3 bg-light_gray rounded-md justify-between">
								<ion-icon :icon="calendar" class="text-[24px]"></ion-icon>
							</span>
							<span class="flex flex-row items-center w-full md:w-5/12  px-2 py-3 bg-light_gray rounded-md justify-between">
								<ion-icon :icon="chevronBack" class="text-[24px]"></ion-icon>
								<h2 class="headings font-bold">October 2021</h2>
								<ion-icon :icon="chevronForward" class="text-[24px]"></ion-icon>
							</span>
							<span class="hidden md:flex flex-row items-center  px-2 py-3 bg-light_gray rounded-md justify-between cursor-pointer" @click="createSchedule()">
								<ion-icon :icon="add" class="text-[26px]"></ion-icon>
							</span>
						</div>
						
						<div class="flex flex-row items-center px-2 md:px-2 gap-[2px] py-3 mt-2 md:mt-4 md:justify-between justify-around normalText font-bold lg:px-0">

							<date-card  :date-number="5" :date-day="'m'" :has-dot="true" ></date-card>
							<date-card  :date-number="6" :date-day="'tu'" :is-selected="true" ></date-card>
							<date-card  :date-number="7" :date-day="'w'" :has-dot="true" ></date-card>
							<date-card  :date-number="8" :date-day="'th'" :has-dot="true" ></date-card>
							<date-card  :date-number="9" :date-day="'f'" ></date-card>
							<date-card  :date-number="10" :date-day="'sa'" ></date-card>
							<date-card  :date-number="11" :date-day="'su'" ></date-card>

						</div>
						<div class="mt-1 flex-row flex justify-center md:mt-4 items-center">
							<span class="flex flex-row items-center justify-between gap-2" >
								<ion-icon :icon="chevronBack" class="text-[24px] hidden md:inline-block"></ion-icon>
								<h2 class="font-bold headings">Tuesday 6, October 2021</h2>
								<ion-icon :icon="chevronForward" class="text-[24px] hidden md:inline-block"></ion-icon>
							</span>
						</div>

						<div class="mt-4 md:mt-5 flex-row flex justify-center items-center">
							<span class="px-4 py-2 md:py-3 flex-row flex items-center rounded-lg text-icon_inactive font-bold bg-light_gray headings">
								Openings <ion-icon :icon="chevronDown" class="text-[22px] ml-2"></ion-icon>
							</span>
						</div>

						<div class="mt-3 grid grid-cols-12 gap-4 md:gap-6 md:mt-6 mb-14 md:px-3 lg:px-0">
							<div class="col-span-12 md:col-span-6 lg:col-span-4">
								<opening :colorClass="'bg-light_green'"></opening>
							</div>
							<div class="col-span-12 md:col-span-6 lg:col-span-4">
								<opening :colorClass="'bg-white border-[1px] border-faded_gray'" :is-opening="true"></opening>
							</div>
							<div class="col-span-12 md:col-span-6 lg:col-span-4">
								<opening :colorClass="'bg-tinted_pink'"></opening>
							</div>
							<div class="col-span-12 md:col-span-6 lg:col-span-4">
								<opening :colorClass="'bg-white border-[1px] border-faded_gray'" :is-opening="true"></opening>
							</div>
							<div class="col-span-12 md:col-span-6 lg:col-span-4">
								<opening :colorClass="'bg-butter_yellow'"></opening>
							</div>
							<div class="col-span-12 md:col-span-6 lg:col-span-4">
								<opening :colorClass="'bg-white border-[1px] border-faded_gray'" :is-opening="true"></opening>
							</div>
						</div>
					</div>
				</div>
				<div class="layout-side-right">
					<side-profile-nav></side-profile-nav>
				</div>
			</div>		
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent, IonTitle, IonIcon, IonButtons, IonHeader, IonToolbar } from '@ionic/vue'
import { defineAsyncComponent, ref } from 'vue'
import { arrowBackOutline, calendar, add, chevronBack, chevronForward, chevronDown } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { componentName, showModal } from '@/modules/core/Modal'
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideProfileNav.vue'))
const Opening = defineAsyncComponent(() => import('@/application/components/schedule/Openings.vue'))
const DateCard = defineAsyncComponent(() => import('@/application/components/schedule/DateCard.vue'))

export default  {
	name: 'calendar',
	components: { IonPage, IonContent, SideProfileNav, IonTitle, IonIcon, IonButtons, IonHeader, IonToolbar, Opening, DateCard },
	setup() {
		const router = useRouter()

		const createSchedule = () => {
			componentName.value = 'createSchedule'
			showModal.value = true
		}

		const showAddAnswer = ref(false)

		return {
			router,
			arrowBackOutline,
			calendar,
			showAddAnswer,
			createSchedule,
			add,
			chevronBack,
			chevronForward,
			chevronDown
		}
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: #F7F7FC;
}
</style>