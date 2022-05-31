<template>
	<div class="showcase-flex">
		<div
			class="flex justify-between items-center p-4 border-bottom-line"
			@click="openCreateTimetableModal(classInst, $router)"
		>
			<IonText>Set up timetable</IonText>
			<IonIcon :icon="arrowForwardOutline" class="text-heading2" />
		</div>
		<div class="flex items-center gap-2 w-full overflow-x-auto p-4">
			<a
				v-for="day in days"
				:key="day.day"
				:class="activeDay === day.day ? 'bg-primaryBg text-primaryText border-primaryBg' : 'text-secondaryText border-itemBg'"
				class="w-full py-2 px-4 rounded-lg text-center border"
				@click="activeDay = day.day"
			>{{ day.name }}</a>
		</div>
		<BlockLoading v-if="loading" />
		<div class="flex flex-col gap-4 px-4">
			<div
				v-for="event in timetable"
				:key="event.hash"
				class="flex flex-col rounded-lg bg-itemBg border-l-8 border-primaryBg p-4 gap-2"
			>
				<IonText class="font-bold">{{ event.title }}</IonText>
				<IonText v-if="event.data.lecturer">{{ event.data.lecturer }}</IonText>
				<div class="flex gap-2 items-center text-secondaryText">
					<IonIcon :icon="timeOutline" class="text-heading2" />
					<IonText>
						{{
							event.data.start.hour.toString().padStart(2, '0')
						}}:{{ event.data.start.minute.toString().padStart(2, '0') }}
						-
						{{
							event.data.end.hour.toString().padStart(2, '0')
						}}:{{ event.data.end.minute.toString().padStart(2, '0') }}
					</IonText>
					<template v-if="classInst.admins.includes(id)">
						<IonIcon
							:icon="createOutline"
							class="text-warning text-heading2 ml-auto"
							@click="openEditTimetableModal({ event, classInst }, $router)"
						/>
						<SpinLoading v-if="deleteLoading" />
						<IonIcon
							v-else
							:icon="trashBinOutline"
							class="text-danger text-heading2"
							@click="deleteEvent(event)"
						/>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { ClassEntity, EventType } from '@modules/classes'
import {
	openCreateTimetableModal,
	openEditTimetableModal,
	useDeleteEvent,
	useTimetable,
} from '@app/composable/classes/timetable'
import {
	arrowForwardOutline,
	createOutline,
	timeOutline,
	trashBinOutline,
} from 'ionicons/icons'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'TimetableList',
	props: {
		classInst: {
			type: ClassEntity,
			required: true,
		},
	},
	setup(props) {
		const { id } = useAuth()
		const route = useRoute()
		const { day: dayStr } = route.query
		const day = parseInt(dayStr as string)
		const activeDay = ref(day >= 0 && day < 7 ? day : 1)
		const days = [
			{ day: 1, name: 'Monday' },
			{ day: 2, name: 'Tuesday' },
			{ day: 3, name: 'Wednesday' },
			{ day: 4, name: 'Thursday' },
			{ day: 5, name: 'Friday' },
			{ day: 6, name: 'Saturday' },
			{ day: 0, name: 'Sunday' },
		]
		const { loading, error, events } = useTimetable(props.classInst.id)
		const timetable = computed(() =>
			events.value.filter(
				(e) =>
					e.data.type === EventType.timetable &&
					e.data.start.day === activeDay.value
			)
		)
		const {
			loading: deleteLoading,
			error: deleteError,
			deleteEvent,
		} = useDeleteEvent()
		return {
			loading,
			error,
			openCreateTimetableModal,
			openEditTimetableModal,
			timeOutline,
			activeDay,
			days,
			timetable,
			arrowForwardOutline,
			trashBinOutline,
			createOutline,
			id,
			deleteLoading,
			deleteError,
			deleteEvent,
		}
	},
})
</script>
