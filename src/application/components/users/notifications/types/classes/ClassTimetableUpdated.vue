<template>
	<div v-if="classInst" class="flex border-bottom-line card-padding items-start">
		<Avatar :name="classInst.name" :size="32" :src="classInst.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>{{ title }} timetable updated</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
			<router-link :to="`/classes/${classInst.id}/timetable`"
				class="border border-2 border-itemBg rounded-xl flex justify-between gap-4 p-4">
				<IonText class="flex-1">Go to timetable</IonText>
				<IonIcon :icon="arrowForwardOutline" />
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useClass } from '@app/composable/classes/classes'
import { arrowForwardOutline, ellipse } from 'ionicons/icons'

export default defineComponent({
	name: 'ClassTimetableUpdated',
	props: {
		notification: {
			type: NotificationEntity,
			required: true
		},
		classId: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { classInst } = useClass(props.classId)
		return { classInst, formatTime, arrowForwardOutline, ellipse }
	}
})
</script>
