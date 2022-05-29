<template>
	<div class="showcase-flex">
		<router-link to="#" class="flex justify-between items-center px-4 md:px-0 py-4 border-bottom-line" >
			<ion-text>Set up Events</ion-text>
			<IonIcon :icon="arrowForwardOutline" class="text-heading2 text-bodyText" />
		</router-link>

		<div class="flex items-center gap-2 w-full overflow-x-auto p-4 md:p-0">
			<a v-for="day in days" :key="day.day"
				:class="activeDay === day.day ? 'bg-primaryBg text-primaryText' : 'text-secondaryText bg-bodyBg border-itemBg md:border-none'"
				class="w-full py-2 px-4 rounded-lg text-center border"
				@click="activeDay = day.day">
				{{ day.name }} 
			</a>
		</div> 
		<div class="flex flex-col gap-4 px-4">
			<div v-for="event in timetable" :key="event.hash" class="flex flex-col min-h-[96px] rounded-lg bg-itemBg text-bodyText border-l-8 border-primaryBg p-4">
				<ion-text class="font-bold ">{{ event.title }}</ion-text>
				<ion-text class="mt-3 flex">
					<IonIcon :icon="timeOutline" class="text-heading2 mr-2 " />
					2 May
				</ion-text>
				<ion-text class="mt-3 flex">
					<IonIcon :icon="calendarClearOutline" class="text-heading2 mr-2 " />
					{{
						event.data.start.hour.toString().padStart(2, '0')
					}}:{{ event.data.start.minute.toString().padStart(2, '0') }}
					-
					{{
						event.data.end.hour.toString().padStart(2, '0')
					}}:{{ event.data.end.minute.toString().padStart(2, '0') }}
					<span class="ml-auto">
						<IonIcon :icon="createOutline" class="text-heading2 mr-5 " />
						<IonIcon :icon="trashBinOutline" class="text-heading2 text-danger " />
					</span>
				</ion-text>
			</div>
		
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ClassEntity, EventType } from '@modules/classes'
import { openTimetableModal, useTimetable } from '@app/composable/classes/timetable'
import { arrowForwardOutline, timeOutline, createOutline, trashBinOutline, calendarClearOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'EventList',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	setup (props) {
		const { loading, error, events } = useTimetable(props.classInst.id)
		const activeDay = ref(1)
		const days = [
			{ day: 1, name: 'Monday' }, { day: 2, name: 'Tuesday' }, { day: 3, name: 'Wednesday' },
			{ day: 4, name: 'Thursday' }, { day: 5, name: 'Friday' }, { day: 6, name: 'Saturday' },
			{ day: 0, name: 'Sunday' }
		]
		const timetable = computed(() => events.value
			.filter((e) => e.data.type === EventType.timetable && e.data.start.day === activeDay.value))
		return {
			loading, error, openTimetableModal,timeOutline, createOutline,calendarClearOutline,
			activeDay, days, timetable, arrowForwardOutline, trashBinOutline
		}
	}
})
</script>
