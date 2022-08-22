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

<script lang="ts">
import { defineComponent } from 'vue'
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useClass } from '@app/composable/classes/classes'
import { ellipse } from 'ionicons/icons'

export default defineComponent({
	name: 'ClassRemoved',
	props: {
		notification: {
			type: NotificationEntity,
			required: true
		},
		classId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { classInst } = useClass(props.classId)
		return { classInst, formatTime, ellipse }
	}
})
</script>
