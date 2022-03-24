<template>
	<div v-if="isLoggedIn"
		class="bg-white border-bottom-line md:rounded-xl flex flex-col sm:flex-row justify-between sm:items-center py-4 px-4 md:px-5 md:py-6">
		<div class="flex flex-col text-left">
			<ion-text class="text-main_dark text-heading font-bold">
				<span>{{ user.bio.firstName }}</span>! welcome back 
			</ion-text>

			<ion-text class="text-gray  ">
				Your performance has been great, keep it up.
			</ion-text>
		</div>

		<div class="flex  border-new_gray h-full gap-8 border-top-line p-4 md:p-0 pb-0 mt-4 md:m-0 -mx-4 ">
			<div class="flex items-center">
				<IonIcon :icon="flash" class="md:text-2xl text-xl text-orange p-3 bg-[#ffa84b1a] rounded-full mr-3"/>
				<div class="flex flex-col text-body">
					<ion-text class="text-main_dark font-bold">
						2 days
					</ion-text>
					<ion-text class="text-gray ">
						Current streak
					</ion-text>
				</div>
			</div>
			<div class="flex items-center">
				<IonIcon :icon="hourglassOutline" class="md:text-2xl text-xl text-primary p-3 bg-[#2c4cca1a] rounded-full mr-3"/>
				<div class="flex flex-col text-body">
					<ion-text class="text-main_dark font-bold">
						13 hours
					</ion-text>
					<ion-text class="text-gray ">
						Total time spent
					</ion-text>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { formatNumber } from '@utils/commons'
import { flash, hourglassOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'StatusBar',
	setup () {
		const { user, isLoggedIn } = useAuth()
		return { user, isLoggedIn, formatNumber, flash , hourglassOutline}
	}
})
</script>
