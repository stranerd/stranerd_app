<template>
	<Justified>
		<div class="md:p-4 lg:py-8">
			<div class="w-full lg:w-8/12 mx-auto bg-white rounded-xl md:py-4 lg:px-4">
				<div class="hidden md:flex card-padding">
					<h1 class="lg:text-2xl text-lg font-bold text-main_dark">
						Notifications
					</h1>
				</div>
				<EmptyState
					v-if="!loading && !error && !notifications.length"
					btnText="Go Home"
					info="You have no notifications yet"
					route="/dashboard"
				/>
				<NotificationCard
					v-for="notification in notifications"
					:key="notification.hash"
					:notification="notification"
				/>
				<div v-if="hasMore" class="text-center py-2 text-18 text-primary-dark">
					<a @click.prevent="fetchOlderNotifications">Load More</a>
				</div>
				<PageLoading v-if="loading" />
			</div>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNotificationList } from '@app/composable/users/notifications'
import Justified from '@app/layouts/Justified.vue'
import NotificationCard from '@app/components/users/notifications/NotificationCard.vue'
import PageLoading from '@app/components/core/PageLoading.vue'
import EmptyState from '@app/components/core/EmptyState.vue'

export default defineComponent({
	name: 'Notifications',
	displayName: 'Notifications',
	middlewares: ['isAuthenticated'],
	components: { NotificationCard, Justified, PageLoading, EmptyState },
	setup () {
		const {
			notifications, error, loading, hasMore, fetchOlderNotifications
		} = useNotificationList()
		return { notifications, error, loading, hasMore, fetchOlderNotifications }
	}
})
</script>
