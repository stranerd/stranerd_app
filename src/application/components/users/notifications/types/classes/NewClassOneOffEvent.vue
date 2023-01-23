<template>
	<div v-if="classInst && event?.isOneOff(event)" class="flex border-bottom-line card-padding items-start">
		<Avatar :name="classInst.name" :size="32" :src="classInst.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>{{ classInst.name }} has a new event</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
			<router-link :to="`/classes/${classInst.id}/events`"
				class="border border-2 border-itemBg rounded-xl flex flex-col gap-2 p-4">
				<IonText>{{ event.title }}</IonText>
				<div class="flex gap-2">
					<IonIcon :icon="timeOutline" />
					<span>{{ formatTime(event.data.scheduledAt) }}</span>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useClass } from '@app/composable/classes/classes'
import { useEvent } from '@app/composable/classes/events'
import { ellipse, timeOutline } from 'ionicons/icons'

const props = defineProps({
	notification: {
		type: NotificationEntity,
		required: true
	},
	classId: {
		type: String,
		required: true
	},
	eventId: {
		type: String,
		required: true
	}
})

const { classInst } = useClass(props.classId)
const { event } = useEvent(props.classId, props.eventId)
</script>
