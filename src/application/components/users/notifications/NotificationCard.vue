<template>
	<div class="bg-light_gray gap-0-5 text-dark w-full my-2 p-4 rounded-md" @click="markNotificationSeen">
		<router-link :class="{'font-bold': !notification.seen}" :to="notification.link">
			<p class="text-body lg:text-base cursor-pointer">
				{{ notification.body }}
			</p>
		</router-link>
		<p class="text-icon_inactive">{{ formatTime(notification.createdAt) }}</p>
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
