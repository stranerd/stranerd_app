<template>
	<Justified>
		<div>
			<div class="flex flex-col items-center">
				<div class="w-full lg:block hidden pt-3 md:bg-primary md:py-6 md:pb-16 px-4">
					<div class="md:flex justify-between items-center w-full hidden max-w-4xl mx-auto ">
						<h1 class="lg:text-2xl text-lg font-bold text-white">
							Notifications
						</h1>
						<span class="text-white text-body flex items-end justify-center hidden">
							Mark all as read
							<ion-icon :icon="checkmarkDone" class="text-xl text-white"></ion-icon>
						</span>
					</div>
				</div>
				<div class="px-4 w-full ">
					<div class="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl lg:-mt-10 mt-6">
						<EmptyState
							v-if="!loading && !error && !notifications.length"
							btnText="Go To Home"
							info="You have no notifications yet"
							route="/dashboard"
						/>
						<NotificationCard
							v-for="notification in notifications"
							:key="notification.hash"
							:notification="notification"
							class="px-4"
						/>
					</div>
					<div v-if="hasMore" class="text-center py-2 text-18 text-primary-dark">
						<a @click.prevent="fetchOlderNotifications">Load More</a>
					</div>
				</div>
			</div>
			<PageLoading v-if="loading" />
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useNotificationList } from '@app/composable/users/notifications'
import Justified from '@app/layouts/Justified.vue'
import NotificationCard from '@app/components/users/notifications/NotificationCard.vue'
import { IonIcon } from '@ionic/vue'
import { checkmarkDone } from 'ionicons/icons'
import PageLoading from '@app/components/core/PageLoading.vue'
import EmptyState from '@app/components/core/EmptyState.vue'

export default defineComponent({
	name: 'Notifications',
	displayName: 'Notifications',
	middlewares: ['isAuthenticated'],
	components: { NotificationCard, Justified, IonIcon, PageLoading, EmptyState },
	setup () {
		const {
			notifications, error, loading, hasMore, fetchOlderNotifications
		} = useNotificationList()
		return { notifications, error, loading, hasMore, fetchOlderNotifications, checkmarkDone }
	}
})
</script>
