<template>
	<DefaultLayout>
		<div class="showcase-flex flex-1 min-h-full">
			<EmptyData v-if="!loading && !error && !notifications.length"
				sub="Keep in touch! Notifications about your activity will show up here."
				title="No notifications yet" />
			<NotificationsListCard
				v-for="notification in notifications"
				:key="notification.hash" :notification="notification"
				class="border-bottom-line"
			/>
			<BlockLoading v-if="loading" />
			<LoadMore v-if="hasMore" :load="fetchOlderNotifications" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNotificationList } from '@app/composable/users/notifications'
import NotificationsListCard from '@app/components/users/notifications/NotificationsListCard.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'AccountNotifications',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	components: { NotificationsListCard },
	setup () {
		useRouteMeta('Notifications', { back: true })
		const { notifications, error, loading, hasMore, fetchOlderNotifications } = useNotificationList()
		return { notifications, error, loading, hasMore, fetchOlderNotifications }
	}
})
</script>
