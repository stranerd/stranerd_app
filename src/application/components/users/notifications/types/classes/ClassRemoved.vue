<template>
	<div v-if="classInst" class="flex border-bottom-line card-padding items-center">
		<Avatar :name="classInst.name" :size="32" :src="classInst.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>You have been removed from {{ classInst.name }}</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useClass } from '@app/composable/classes/classes'
import { ellipse } from 'ionicons/icons'

const props = defineProps({
	notification: {
		type: NotificationEntity,
		required: true
	},
	classId: {
		type: String,
		required: true
	}
})

const { classInst } = useClass(props.classId)
</script>
