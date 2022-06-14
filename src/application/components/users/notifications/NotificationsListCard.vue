<template>
	<div class="flex flex-col card-padding" @click="markNotificationSeen">
		<router-link :class="notification.seen ? 'text-secondaryText' : 'font-bold'" :to="notification.link">
			{{ notification.body }}
		</router-link>
		<p class="text-sub">{{ formatTime(notification.createdAt) }}</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useNotification } from '@app/composable/users/notifications'

export default defineComponent({
	name: 'NotificationsCard',
	props: {
		notification: {
			type: Object as PropType<NotificationEntity>,
			required: true
		}
	},
	setup (props) {
		const { loading, error, markNotificationSeen } = useNotification(props.notification)
		return { loading, error, markNotificationSeen, formatTime }
	}
})
</script>
