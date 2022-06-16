<template>
	<div v-if="isEventOneOff(event)" class="flex flex-col rounded-lg bg-itemBg border-l-8 border-primaryBg p-4 gap-2">
		<IonText class="font-bold">{{ event.title }}</IonText>
		<IonText v-if="event.data.scheduledAt" class="flex items-center gap-1">
			<IonIcon :icon="calendarClearOutline" class="text-heading2" />
			<span>{{ formatDateAsDigits(new Date(event.data.scheduledAt), false) }}</span>
		</IonText>
		<div class="flex gap-2 items-center text-secondaryText">
			<IonIcon :icon="timeOutline" class="text-heading2" />
			<IonText>{{ formatTimeAsDigits(new Date(event.data.scheduledAt)) }}</IonText>
			<span v-if="classInst.admins.includes(id)" class="ml-auto">
				<SpinLoading v-if="loading" />
				<IonIcon v-else :icon="trashBinOutline" class="text-danger text-heading2"
					@click="deleteEvent" />
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity, EventEntity, isEventOneOff } from '@modules/classes'
import { calendarClearOutline, timeOutline, trashBinOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { useDeleteEvent } from '@app/composable/classes/timetable'
import { formatDateAsDigits, formatTimeAsDigits } from '@utils/dates'

export default defineComponent({
	name: 'EventListCard',
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
			id, loading, error, deleteEvent, formatDateAsDigits, formatTimeAsDigits,
			timeOutline, calendarClearOutline, trashBinOutline, isEventOneOff
		}
	}
})
</script>
