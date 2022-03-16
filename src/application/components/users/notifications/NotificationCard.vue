<template>
	<div class="bg-white card-padding rounded-lg text-gray text-sm md:text-base" @click="markNotificationSeen">
		<div>
			<div class="flex justify-between gap-2 items-baseline">
				<router-link :class="{'font-bold': !notification.seen}" :to="notification.link" class="flex-grow">
					<p class=" cursor-pointer">
						{{ notification.body }}
					</p>
				</router-link>
				<span v-if="!notification.seen" class="dot bg-primary" />
			</div>
			<p>{{ formatTime(notification.createdAt) }}</p>
		</div>
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
