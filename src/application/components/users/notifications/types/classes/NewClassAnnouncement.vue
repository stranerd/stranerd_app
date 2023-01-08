<template>
	<div v-if="classInst && announcement" class="flex border-bottom-line card-padding items-start">
		<Avatar :name="classInst.name" :size="32" :src="classInst.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>{{ classInst.name }} has a new announcement</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
			<router-link :to="`/classes/${classInst.id}/announcements`"
				class="border border-2 border-itemBg rounded-xl p-4">
				{{ announcement.body }}
			</router-link>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useClass } from '@app/composable/classes/classes'
import { useAnnouncement } from '@app/composable/classes/announcements'
import { ellipse } from 'ionicons/icons'

const props = defineProps({
	notification: {
		type: NotificationEntity,
		required: true
	},
	classId: {
		type: String,
		required: true
	},
	announcementId: {
		type: String,
		required: true
	}
})

const { classInst } = useClass(props.classId)
const { announcement } = useAnnouncement(props.classId, props.announcementId)
</script>
