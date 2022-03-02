<template>
	<div v-if="isLoggedIn"
		class="bg-white border-bottom-line md:rounded-xl flex flex-col sm:flex-row justify-between sm:items-center py-4 px-4">
		<div class="flex flex-col w-full text-left">
			<ion-text class="text-main_dark sm:text-xl text-base font-bold">
				Welcome home,
			</ion-text>
			<ion-text class="text-main_dark leading-normal text-2xl sm:text-3xl font-bold flex items-center gap-1">
				<span>{{ user.fullName }}</span>
				<IonIcon v-if="user.isVerified" :icon="checkmarkCircleOutline" color="white" />
			</ion-text>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { formatNumber } from '@utils/commons'
import { checkmarkCircleOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'StatusBar',
	setup () {
		const { user, isLoggedIn } = useAuth()
		return { user, isLoggedIn, formatNumber, checkmarkCircleOutline }
	}
})
</script>
