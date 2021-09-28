<template>
	<div>
		<NotificationsListCard
			v-for="notification in notifications"
			:key="notification.hassssssh"
			:notification="notification"
		/>
		<div v-if="hasMore" class="text-center py-2 text-18 text-primary-dark">
			<a @click.prevent="fetchOlderNotifications">Load More</a>
		</div>
		<DisplayWarning v-if="!loading && !error && notifications.length === 0" message="No notifications found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@nuxtjs/composition-api'
import { useNotificationList } from '@app/hooks/users/notifications'
import NotificationsListCard from '@app/components/users/notifications/NotificationsListCard.vue'

export default defineComponent({
	name: 'NotificationsList',
	components: { NotificationsListCard },
	setup () {
		const { notifications, error, loading, listener, hasMore, fetchOlderNotifications } = useNotificationList()
		onMounted(() => {
			if (!listener.isRunning.value) listener.startListener()
		})
		return { notifications, error, loading, hasMore, fetchOlderNotifications }
	}
})
</script>
