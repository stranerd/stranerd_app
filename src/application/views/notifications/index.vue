<template>
	<ion-page>
		<ion-content>
  			<div class="w-full h-full flex flex-col items-center lg:mt-32 mt-16 px-4 max-w-4xl mx-auto">
				  <div class="flex justify-between items-center  w-full ">
					 <h1 class="lg:text-2xl text-lg font-bold text-dark_gray" >
				Notifications
					</h1> 

					<span class="text-icon_inactive normalText flex items-end justify-center">
						Mark all as read
						<ion-icon :icon="checkmarkDone" class="text-xl text-icon_inactive" ></ion-icon>
					</span>
				  </div>

			<p>
 <ion-skeleton-text :animated="true"  style="width: 60%"></ion-skeleton-text>
</p>
		  <NotificationCard
		  class="px-4"
			v-for="notification in notifications"
			:key="notification.hash"
			:notification="notification"


		  />
	
		<div v-if="hasMore" class="text-center py-2 text-18 text-primary-dark">
			<a @click.prevent="fetchOlderNotifications">Load More</a>
		</div>

	</div>
	</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useNotificationList } from '@/application/composable/users/notifications'
import NotificationCard from '@/application/components/Notification/NotificationCard.vue'
import { IonContent, IonPage,IonIcon,IonSkeletonText } from '@ionic/vue'
import { checkmarkDone } from 'ionicons/icons'

export default defineComponent( {
	name:'Notification',
	layout: 'Justified',
	components: {NotificationCard, IonContent, IonPage, IonIcon, IonSkeletonText },
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