<template>
	<Justified>
		<div>
			<div class="flex flex-col items-center px-4 max-w-4xl mx-auto">
				<div class="md:flex justify-between items-center w-full hidden">
					<h1 class="lg:text-2xl text-lg font-bold text-dark_gray">
						Notifications
					</h1>

					<span class="text-icon_inactive normalText flex items-end justify-center">
						Mark all as read
						<ion-icon :icon="checkmarkDone" class="text-xl text-icon_inactive"></ion-icon>
					</span>
				</div>
				<empty-state
					v-if="!notifications.length"
					btnText="Go To Home"
					info="You have no notifications yet"
					route="/dashboard"
				/>

				<template v-else>
					<NotificationCard
						v-for="notification in notifications"
						:key="notification.hash"
						:notification="notification"
						class="px-4"
					/>
				</template>

				<span class="text-icon_inactive normalText flex items-end justify-center mt-3 md:hidden">
					Mark all as read
					<ion-icon :icon="checkmarkDone" class="text-xl text-icon_inactive"></ion-icon>
				</span>

				<div v-if="hasMore" class="text-center py-2 text-18 text-primary-dark">
					<a @click.prevent="fetchOlderNotifications">Load More</a>
				</div>

			</div>
			<PageLoading v-if="loading" />
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useNotificationList } from '@app/composable/users/notifications'
import Justified from '@root/application/layouts/Justified.vue'
import NotificationCard from '@app/components/users/notifications/NotificationCard.vue'
import { IonIcon } from '@ionic/vue'
import { checkmarkDone } from 'ionicons/icons'
import PageLoading from '@app/components/core/PageLoading.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'Notifications',
	displayName: 'Notifications',
	middlewares: ['isAuthenticated'],
	components: { NotificationCard, Justified, IonIcon, PageLoading, EmptyState },
	setup () {
		const { id } = useAuth()
		const {
			notifications,
			error,
			loading,
			listener,
			hasMore,
			fetchOlderNotifications
		} = useNotificationList(id.value)
		onMounted(() => {
			if (!listener.isRunning.value) listener.startListener()
		})
		return { notifications, error, loading, hasMore, fetchOlderNotifications, checkmarkDone }
	}
})
</script>
