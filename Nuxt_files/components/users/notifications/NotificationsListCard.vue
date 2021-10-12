<template>
	<div class="notification gap-0-5 text-dark" @click="markNotificationSeen">
		<PageLoading v-if="loading" />
		<NuxtLink :class="{'text-primaryDark': !notification.seen}" :to="notification.link">
			<BodyText class="main cursor-pointer" variant="large">
				<DynamicText>{{ notification.body }}</DynamicText>
			</BodyText>
		</NuxtLink>
		<BodyText variant="sub">
			<DynamicText>{{ formatTime(notification.createdAt) }}</DynamicText>
		</BodyText>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NotificationEntity } from '@/modules/users'
import { formatTime } from '@/utils/dates'
import { useNotification } from '@/application/hooks/users/notifications'

export default defineComponent({
	name: 'NotificationsListCard',
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

<style lang="scss" scoped>
	.notification {
		display: flex;
		flex-direction: column;
		border-bottom: 1px solid $color-line;
		padding: 1.5rem 0;
	}
</style>
