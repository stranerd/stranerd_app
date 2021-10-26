<template>
	<ion-page>
		<ion-content>
  			<div class="w-full h-full flex flex-col items-center md:mt-32 mt-20 px-4 max-w-4xl mx-auto">
				  <div class="md:flex justify-between items-center  w-full hidden">
					 <h1 class="lg:text-2xl text-lg font-bold text-dark_gray" >
				Notifications
					</h1> 

					<span class="text-icon_inactive normalText flex items-end justify-center">
						Mark all as read
						<ion-icon :icon="checkmarkDone" class="text-xl text-icon_inactive" ></ion-icon>
					</span>
				  </div>

		  <NotificationCard
		  class="px-4"
			v-for="notification in notifications"
			:key="notification.hash"
			:notification="notification"
		  />
		  	<span class="text-icon_inactive normalText flex items-end justify-center mt-3 md:hidden">
						Mark all as read
						<ion-icon :icon="checkmarkDone" class="text-xl text-icon_inactive" ></ion-icon>
					</span>
	
		<div v-if="hasMore" class="text-center py-2 text-18 text-primary-dark">
			<a @click.prevent="fetchOlderNotifications">Load More</a>
		</div>

	</div>
	<page-loading v-if="loading"/>
	</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useNotificationList } from '@/application/composable/users/notifications'
import NotificationCard from '@/application/components/Notification/NotificationCard.vue'
import { IonContent, IonPage,IonIcon,IonSkeletonText } from '@ionic/vue'
import { checkmarkDone } from 'ionicons/icons'
import PageLoading from '@/application/components/core/PageLoading.vue'

export default defineComponent( {
	name:'Notification',
	layout: 'Justified',
	components: {NotificationCard, IonContent, IonPage, IonIcon,  PageLoading },
	setup () {
		const { notifications, error, loading, listener, hasMore, fetchOlderNotifications } = useNotificationList()
		onMounted(() => {
			if (!listener.isRunning.value) listener.startListener()
		})
		return { notifications, error, loading, hasMore, fetchOlderNotifications, checkmarkDone }
	}
})
</script>

<style>

</style>