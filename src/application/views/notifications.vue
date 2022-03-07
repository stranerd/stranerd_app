<template>
	<Justified>
		<div>
			<div class="flex flex-col items-center">
		
				<div class="px-4 w-full ">
					<div class="w-full lg:w-8/12 mx-auto bg-white py-6 rounded-xl md:mt-6">

						<div class="md:flex justify-between items-center w-full hidden  mx-auto  border-b border-new_gray px-8 pb-3">
							<h1 class="lg:text-2xl text-lg font-bold text-main_dark">
								Notifications
							</h1>
							<span class="text-main_dark text-body hidden items-end justify-center">
								Mark all as read
								<ion-icon :icon="checkmarkDoneOutline" class="text-xl text-main_dark"></ion-icon>
							</span>
						</div>
					
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
							class="md:px-8"
							
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
import { checkmarkDoneOutline } from 'ionicons/icons'
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
		return { notifications, error, loading, hasMore, fetchOlderNotifications, checkmarkDoneOutline }
	}
})
</script>
