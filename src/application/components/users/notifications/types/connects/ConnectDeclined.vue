<template>
	<div v-if="user" class="flex border-bottom-line card-padding items-start">
		<Avatar :id="user.id" :name="user.bio.fullName" :size="32" :src="user.bio.photo" />
		<div class="flex flex-col gap-2 flex-1">
			<div class="flex gap-2 items-center">
				<IonText>{{ user.bio.fullName }} declined your request</IonText>
				<IonIcon :icon="ellipse" class="dot" />
				<IonText>{{ formatTime(notification.createdAt) }}</IonText>
			</div>
			<IonText class="text-secondaryText">The connection was not established</IonText>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { ellipse } from 'ionicons/icons'
import { useUser } from '@app/composable/users/users'

const props = defineProps({
	notification: {
		type: NotificationEntity,
		required: true
	},
	connectId: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	}
})

const { user } = useUser(props.userId)
</script>
