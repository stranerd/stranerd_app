<template>
	<div class="showcase-flex">
		<div class="flex justify-between items-center px-4 md:px-0 py-4 border-bottom-line" @click="openTimetableModal(classInst)">
			<ion-text>Set up timetable</ion-text>
			<IonIcon :icon="arrowForwardOutline" class="text-heading2 text-bodyText" />


		</div>
		<div class="flex items-center gap-2 w-full overflow-x-auto p-4 md:p-0">
			<a v-for="day in days" :key="day.day"
				:class="activeDay === day.day ? 'bg-primaryBg text-primaryText' : 'text-secondaryText bg-bodyBg border-itemBg md:border-none'"
				class="w-full py-2 px-4 rounded-lg text-center border"
				@click="activeDay = day.day">
				{{ day.name }} 
			</a>
		</div>
		<div class="flex flex-col md:gap-4 px-4">
			<div class="flex flex-col min-h-[96px] rounded-lg border-l-8 border-primaryBg">
				<ion-text>{{ event.title }}</ion-text>
			</div>
			<!-- <div v-for="event in timetable" :key="event.hash"
				class="card-padding bg-white rounded-xl flex gap-1 items-center">
				<span class="bg-new_gray text-gray py-1 px-2 rounded-lg text-sub">
					{{
						event.data.start.hour.toString().padStart(2, '0')
					}}:{{ event.data.start.minute.toString().padStart(2, '0') }}
					-
					{{
						event.data.end.hour.toString().padStart(2, '0')
					}}:{{ event.data.end.minute.toString().padStart(2, '0') }}
				</span>
				<span class="text-dark">{{ event.title }}</span>
			</div> -->
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ClassEntity, EventType } from '@modules/classes'
import { openTimetableModal, useTimetable } from '@app/composable/classes/timetable'
import { arrowForwardOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'TimetableList',
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
			loading, error, openTimetableModal,
			activeDay, days, timetable, arrowForwardOutline
		}
	}
})
</script>
