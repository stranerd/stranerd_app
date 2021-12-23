<template>
	<div
		:class="[!notification.seen ? 'bg-light_gray' : ' border-b border-light_gray', 'gap-0-5 text-dark w-full my-2 p-4 rounded-md']"
		@click="markNotificationSeen"
	>
		<router-link :class="{'text-primary-dark': !notification.seen}" :to="notification.link">
			<p class="normalText lg:text-base cursor-pointer">
				<span>{{ notification.body }}</span>
			</p>
		</router-link>
		<div class="flex justify-between font-bold normalText items-center mt-2">
			<p class="text-icon_inactive">
				<span>{{ formatTime(notification.createdAt) }}</span>
			</p>
			<span v-if="!notification.seen"
				class="text-icon_inactive normalText flex items-end justify-center cursor-pointer hidden"
				@click="markNotificationSeen">
				Mark as read
				<ion-icon :icon="checkmark" class="text-xl text-icon_inactive"></ion-icon>
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NotificationEntity } from '@modules/users'
import { formatTime } from '@utils/dates'
import { useNotification } from '@app/composable/users/notifications'
import { IonIcon } from '@ionic/vue'
import { checkmark } from 'ionicons/icons'

export default defineComponent({
	name: 'NotificationsCard',
	components: { IonIcon },
	props: {
		notification: {
			type: Object as PropType<NotificationEntity>,
			required: true
		}
	},
	setup (props) {
		const { loading, error, markNotificationSeen } = useNotification(props.notification)
		return { loading, error, markNotificationSeen, formatTime, checkmark }
	}
})
</script>
