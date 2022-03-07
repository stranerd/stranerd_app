<template>
	<div class="bg-white gap-0-5 text-dark w-full my-2 py-4 rounded-md text-gray" @click="markNotificationSeen">
		<router-link :class="{'font-bold': !notification.seen}" :to="notification.link">
			<p class=" cursor-pointer">
				{{ notification.body }}
			</p>
		</router-link>
		<p >{{ formatTime(notification.createdAt) }}</p>
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
