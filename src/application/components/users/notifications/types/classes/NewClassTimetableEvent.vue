<template>
	<div v-if="classInst && event?.isTimetable(event)" class="flex border-bottom-line card-padding items-start">
		<Avatar :name="classInst.name" :size="32" :src="classInst.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>
					{{ event.title }} class starts
					{{ timeInMin ? `in ${ timeInMin } minutes` : 'now' }}
				</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
			<router-link :to="`/classes/${classInst.id}/timetable`"
				class="border border-2 border-itemBg rounded-xl flex flex-col gap-2 p-4">
				<IonText class="font-bold">{{ event.title }}</IonText>
				<IonText>{{ event.data.lecturer }}</IonText>
				<div class="flex gap-2">
					<IonIcon :icon="timeOutline" />
					<span>
						{{
							event.data.start.hour.toString().padStart(2, '0')
						}}:{{ event.data.start.minute.toString().padStart(2, '0') }}
						&nbsp;-&nbsp;
						{{
							event.data.end.hour.toString().padStart(2, '0')
						}}:{{ event.data.end.minute.toString().padStart(2, '0') }}
					</span>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useClass } from '@app/composable/classes/classes'
import { useEvent } from '@app/composable/classes/events'
import { ellipse, timeOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'NewClassTimetableEvent',
	props: {
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
		},
		timeInMin: {
			type: Number,
			required: true
		}
	},
	setup (props) {
		const { classInst } = useClass(props.classId)
		const { event } = useEvent(props.classId, props.eventId)
		return { classInst, event, ellipse, timeOutline, formatTime }
	}
})
</script>
