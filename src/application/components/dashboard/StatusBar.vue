<template>
	<div
		class="bg-white border-bottom-line md:rounded-xl flex flex-col sm:flex-row justify-between sm:items-center">
		<div class="flex flex-col text-left p-4 md:p-6">
			<ion-text class="text-main_dark text-heading font-bold">
				{{ user ? `${user.bio.firstName}! Welcome back` : 'Hello there' }}
			</ion-text>
			<ion-text class="text-gray">
				{{ user ? 'Your performance has been great, keep it up.' : 'You are not logged in.' }}
			</ion-text>
		</div>

		<div class="flex border-new_gray h-full gap-4 border-top-line p-4 md:p-6">
			<div class="flex items-center w-full md:w-auto">
				<IonIcon :icon="flash" class="md:text-2xl text-xl text-orange p-3 bg-[#ffa84b1a] rounded-full mr-3" />
				<div class="flex flex-col">
					<ion-text class="text-main_dark font-semibold">
						{{
							user ? `${formatNumber(user.account.streak.count)} ${pluralize(user.account.streak.count, 'day', 'days')}` : 'N/A'
						}}
					</ion-text>
					<ion-text class="text-gray">Current streak</ion-text>
				</div>
			</div>
			<div v-if="0" class="flex items-center w-full md:w-auto">
				<IonIcon :icon="hourglassOutline"
					class="md:text-2xl text-xl text-primary p-3 bg-[#2c4cca1a] rounded-full mr-3" />
				<div class="flex flex-col">
					<ion-text class="text-main_dark font-semibold">13 hours</ion-text>
					<ion-text class="text-gray">Total time spent</ion-text>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { formatNumber, pluralize } from '@utils/commons'
import { flash, hourglassOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'StatusBar',
	setup () {
		const { user } = useAuth()
		return { user, formatNumber, pluralize, flash, hourglassOutline }
	}
})
</script>
