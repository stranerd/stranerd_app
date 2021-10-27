<template>
  	<div :class="[!notification.seen?'bg-light_gray':' border-b border-light_gray', 'gap-0-5 text-dark w-full my-2 cardPadding rounded-md' ]" v-if="!loading" >
		<router-link :class="{'text-primary-dark': !notification.seen}" :to="notification.link">
			<p class="normalText lg:text-base cursor-pointer" >
				<span>{{ notification.body }}</span>
			</p>
		</router-link>
		<div class="flex justify-between font-bold normalText items-center mt-2">
				<p class="text-icon_inactive">
			<span>{{ formatTime(notification.createdAt) }}</span>
		</p>
			<span class="text-icon_inactive normalText flex items-end justify-center cursor-pointer" v-if="!notification.seen" @click="markNotificationSeen">
						Mark all as read
						<ion-icon :icon="checkmark" class="text-xl text-icon_inactive" ></ion-icon>
					</span>
		</div>
	
	</div>

  	<div :class="[notification.seen?'bg-light_gray':' border-b border-light_gray', 'gap-0-5 text-dark w-full my-2 cardPadding rounded-md' ]" v-else>
			<p class="normalText lg:text-base cursor-pointer" >
				<ion-skeleton-text :animated="true"  style="width: 250px"></ion-skeleton-text>
			</p>
		<div class="flex justify-between font-bold normalText items-center mt-2">
				<p class="text-icon_inactive">
			<ion-skeleton-text :animated="true"  style="width: 50px"></ion-skeleton-text>
		</p>
			<span class="text-icon_inactive normalText flex items-end justify-center cursor-pointer" @click="markNotificationSeen">
						<ion-skeleton-text :animated="true"  style="width: 100px"></ion-skeleton-text>
					</span>
		</div>
	
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NotificationEntity } from '@/modules/users'
import { formatTime } from '@/utils/dates'
import { useNotification } from '@/application/composable/users/notifications'
import { IonIcon,IonSkeletonText } from '@ionic/vue'
import { checkmark } from 'ionicons/icons'
export default defineComponent( {
	name: 'NotificationsCard',
	components: {IonIcon, IonSkeletonText, },
	props: {
		notification: {
			type: Object as PropType<NotificationEntity>,
			required: true
		}
	},
    	setup (props: any) {
		const { loading, error, markNotificationSeen } = useNotification(props.notification)
		return { loading, error, markNotificationSeen, formatTime, checkmark }
	}
})
</script>

<style>

</style>