<template>
	<div class="p-4">
		<UserProfileInfo/>
		<div class="buttons">
			<div class="px-4 py-3 mb-4 rounded-lg border" v-for="button in buttons" :key="button.name">
				<span class="flex items-center text-secondaryText">
					<IonIcon :icon="button.icon" class="mr-4" />
					<IonText class="text-sm">{{button.name}}</IonText>
				</span>
			</div>

			<div class="px-4 py-3 mb-4 rounded-lg border ">
				<span class="flex items-center text-danger">
					<IonIcon :icon="logOutOutline" class="mr-4" />
					<IonText class="text-sm">Log out</IonText>
				</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
/* eslint-disable */
import { defineComponent } from 'vue'
import UserProfileInfo from './UserProfileInfo.vue'
import { personOutline, settingsOutline, notificationsOutline, cardOutline, shieldCheckmarkOutline, 
	informationCircleOutline, mailOutline, logOutOutline } from 'ionicons/icons'


export default defineComponent({
	name: 'UserProfile',
	components: { UserProfileInfo },
	setup () {
		const buttons = [
			{icon: personOutline, name: 'Edit Profile'},
			{icon: settingsOutline, name: 'Account set up'},
			{icon: notificationsOutline, name: 'Manage notifications'},
			{icon: cardOutline, name: 'Subscription'},
			{icon: shieldCheckmarkOutline, name: 'Security'},
			{icon: mailOutline, name: 'Contact us'},
			{icon: informationCircleOutline, name: 'About'}
		]
        
		return {
            buttons, logOutOutline
		}
	}
})
</script>
