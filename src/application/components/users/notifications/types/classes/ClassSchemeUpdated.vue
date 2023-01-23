<template>
	<div v-if="classInst" class="flex border-bottom-line card-padding items-start">
		<Avatar :name="classInst.name" :size="32" :src="classInst.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>{{ title }} course outline updated</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
			<router-link :to="`/classes/${classInst.id}/schemes`"
				class="border border-2 border-itemBg rounded-xl flex justify-between gap-4 p-4">
				<IonText class="flex-1">Go to course outline</IonText>
				<IonIcon :icon="arrowForwardOutline" />
			</router-link>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useClass } from '@app/composable/classes/classes'
import { arrowForwardOutline, ellipse } from 'ionicons/icons'

const props = defineProps({
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
})

const { classInst } = useClass(props.classId)
</script>
