<template>
	<div v-if="isEventTimetable(event)"
		class="flex flex-col rounded-lg bg-itemBg border-l-8 border-primaryBg p-4 gap-2">
		<IonText class="font-bold">{{ event.title }}</IonText>
		<IonText v-if="event.data.lecturer">{{ event.data.lecturer }}</IonText>
		<div class="flex gap-2 items-center text-secondaryText">
			<IonIcon :icon="timeOutline" />
			<IonText>
				{{
					event.data.start.hour.toString().padStart(2, '0')
				}}:{{ event.data.start.minute.toString().padStart(2, '0') }}
				-
				{{
					event.data.end.hour.toString().padStart(2, '0')
				}}:{{ event.data.end.minute.toString().padStart(2, '0') }}
			</IonText>
			<span v-if="classInst.admins.includes(id)" class="ml-auto flex items-center gap-2">
				<IonIcon :icon="createOutline" class="text-warning"
					@click="openEditTimetableModal({ event, classInst }, $router)" />
				<SpinLoading v-if="loading" />
				<IonIcon v-else :icon="trashBinOutline" class="text-danger" @click="deleteEvent(event)" />
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity, EventEntity, isEventTimetable } from '@modules/classes'
import { openEditTimetableModal, useDeleteEvent } from '@app/composable/classes/timetable'
import { createOutline, timeOutline, trashBinOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'TimetableListCard',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		},
		event: {
			type: EventEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { loading, error, deleteEvent } = useDeleteEvent(props.event.classId, props.event.id)
		return {
			id, deleteEvent, loading, error, openEditTimetableModal, timeOutline,
			trashBinOutline, createOutline, isEventTimetable
		}
	}
})
</script>
