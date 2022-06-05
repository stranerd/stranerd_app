<template>
	<div class="showcase-flex">
		<div class="flex justify-between items-center p-4 border-bottom-line"
			@click="openCreateTimetableModal(classInst, $router)">
			<IonText>Set up timetable</IonText>
			<IonIcon :icon="arrowForwardOutline" class="text-heading2" />
		</div>
		<div class="flex items-center gap-2 w-full overflow-x-auto p-4">
			<a v-for="day in days" :key="day.day"
				:class="activeDay === day.day ? 'bg-primaryBg text-primaryText border-primaryBg' : 'text-secondaryText border-itemBg'"
				class="w-full py-2 px-4 rounded-lg text-center border"
				@click="activeDay = day.day">
				{{ day.name }}
			</a>
		</div>
		<div class="flex flex-col gap-4 px-4">
			<EmptyState v-if="!loading && !error && timetable.length === 0" info="No timetable" />
			<TimetableListCard v-for="event in timetable" :key="event.hash" :classInst="classInst" :event="event" />
		</div>
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ClassEntity, EventType } from '@modules/classes'
import { openCreateTimetableModal, useTimetable } from '@app/composable/classes/timetable'
import { arrowForwardOutline } from 'ionicons/icons'
import { useRoute } from 'vue-router'
import TimetableListCard from '@app/components/classes/timetable/TimetableListCard.vue'

export default defineComponent({
	name: 'TimetableList',
	components: { TimetableListCard },
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	setup (props) {
		const route = useRoute()
		const { day: dayStr } = route.query
		const day = parseInt(dayStr as string)
		const activeDay = ref(day >= 0 && day < 7 ? day : 1)
		const days = [
			{ day: 1, name: 'Monday' }, { day: 2, name: 'Tuesday' }, { day: 3, name: 'Wednesday' },
			{ day: 4, name: 'Thursday' }, { day: 5, name: 'Friday' }, { day: 6, name: 'Saturday' },
			{ day: 0, name: 'Sunday' }
		]
		const { loading, error, events } = useTimetable(props.classInst.id)
		const timetable = computed(() => events.value
			.filter((e) => e.data.type === EventType.timetable && e.data.start.day === activeDay.value))
		return {
			loading, error, openCreateTimetableModal,
			activeDay, days, timetable, arrowForwardOutline
		}
	}
})
</script>
