<template>
	<div v-if="event.isOneOff(event)" class="flex flex-col rounded-lg bg-itemBg border-l-8 border-primaryBg p-4 gap-2">
		<IonText class="font-bold">{{ event.title }}</IonText>
		<IonText v-if="event.data.scheduledAt" class="flex items-center gap-1">
			<IonIcon :icon="calendarClearOutline" />
			<span>{{ formatDateAsDigits(new Date(event.data.scheduledAt), false) }}</span>
		</IonText>
		<div class="flex gap-2 items-center text-secondaryText">
			<IonIcon :icon="timeOutline" />
			<IonText>{{ formatTimeAsDigits(new Date(event.data.scheduledAt)) }}</IonText>
			<span v-if="classInst.admins.includes(id)" class="ml-auto">
				<SpinLoading v-if="loading" />
				<IonIcon v-else :icon="trashBinOutline" class="text-danger" @click="deleteEvent" />
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { ClassEntity, EventEntity } from '@modules/classes'
import { calendarClearOutline, timeOutline, trashBinOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import { markEventSeen, useDeleteEvent } from '@app/composable/classes/events'
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
		onMounted(async () => {
			await markEventSeen(props.event, id.value)
		})
		const { loading, error, deleteEvent } = useDeleteEvent(props.event.classId, props.event.id)
		return {
			id, loading, error, deleteEvent, formatDateAsDigits, formatTimeAsDigits,
			timeOutline, calendarClearOutline, trashBinOutline
		}
	}
})
</script>
