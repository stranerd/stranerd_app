<template>
	<DashboardWithToolbarLayout>
		<div class="flex flex-col px-3 text-icon_inactive lg:px-0">
			<div class="flex flex-row items-center md:justify-between mt-1 md:px-2 lg:px-0">
				<span
					class=" flex-row items-center hidden lg:flex px-2 py-3 bg-light_gray rounded-md justify-between">
					<ion-icon :icon="calendar" class="text-[24px]"></ion-icon>
				</span>
				<span
					class="flex flex-row items-center w-full md:w-5/12  px-2 py-3 bg-light_gray rounded-md justify-between">
					<IonIcon :icon="chevronBack" class="text-[24px]"/>
					<h2 class="headings font-bold">October 2021</h2>
					<IonIcon :icon="chevronForward" class="text-[24px]"/>
				</span>
				<span
					class="hidden md:flex flex-row items-center px-2 py-3 bg-light_gray rounded-md justify-between cursor-pointer"
					@click="createSchedule()">
					<IonIcon :icon="add" class="text-[26px]"/>
				</span>
			</div>

			<div
				class="flex flex-row items-center px-2 md:px-2 gap-[2px] py-3 mt-2 md:mt-4 md:justify-between justify-around normalText font-bold lg:px-0">
				<date-card :date-day="'m'" :date-number="5" :has-dot="true"/>
				<date-card :date-day="'tu'" :date-number="6" :is-selected="true"/>
				<date-card :date-day="'w'" :date-number="7" :has-dot="true"/>
				<date-card :date-day="'th'" :date-number="8" :has-dot="true"/>
				<date-card :date-day="'f'" :date-number="9"/>
				<date-card :date-day="'sa'" :date-number="10"/>
				<date-card :date-day="'su'" :date-number="11"/>

			</div>
			<div class="mt-1 flex-row flex justify-center md:mt-4 items-center">
				<span class="flex flex-row items-center justify-between gap-2">
					<ion-icon :icon="chevronBack" class="text-[24px] hidden md:inline-block"></ion-icon>
					<h2 class="font-bold headings">Tuesday 6, October 2021</h2>
					<ion-icon :icon="chevronForward" class="text-[24px] hidden md:inline-block"></ion-icon>
				</span>
			</div>

			<div class="mt-4 md:mt-5 flex-row flex justify-center items-center">
				<span
					class="px-4 py-2 md:py-3 flex-row flex items-center rounded-lg text-icon_inactive font-bold bg-light_gray headings">
					Openings <IonIcon :icon="chevronDown" class="text-[22px] ml-2"/>
				</span>
			</div>

			<div class="mt-3 grid grid-cols-12 gap-4 md:gap-6 md:mt-6 mb-14 md:px-3 lg:px-0">
				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<opening :colorClass="'bg-light_green'"/>
				</div>
				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<opening :colorClass="'bg-white border-[1px] border-faded_gray'"
						:is-opening="true"/>
				</div>
				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<opening :colorClass="'bg-tinted_pink'"/>
				</div>
				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<opening :colorClass="'bg-white border-[1px] border-faded_gray'"
						:is-opening="true"/>
				</div>
				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<opening :colorClass="'bg-butter_yellow'"/>
				</div>
				<div class="col-span-12 md:col-span-6 lg:col-span-4">
					<opening :colorClass="'bg-white border-[1px] border-faded_gray'"
						:is-opening="true"/>
				</div>
			</div>
		</div>
	</DashboardWithToolbarLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonIcon } from '@ionic/vue'
import DashboardWithToolbarLayout from '@app/layouts/DashboardWithToolbar.vue'
import { add, arrowBackOutline, calendar, chevronBack, chevronDown, chevronForward } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import Opening from '@app/components/users/schedule/Openings.vue'
import DateCard from '@app/components/users/schedule/DateCard.vue'
import { useScheduleModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'ScheduleCalendar',
	components: {
		DashboardWithToolbarLayout,
		IonIcon,
		Opening,
		DateCard
	},
	setup() {
		const router = useRouter()

		const createSchedule = () => {
			useScheduleModal().openCreateSchedule()
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
})
</script>
