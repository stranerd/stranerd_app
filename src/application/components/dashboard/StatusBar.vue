<template>
	<div v-if="isLoggedIn"
		class="bg-primary h-44 sm:h-36 rounded-b-xl sm:rounded-3xl flex flex-col sm:flex-row justify-between sm:items-center sm:p-0 p-4">
		<div class="flex flex-col ml-4 sm:ml-8 w-full text-left">
			<ion-text class="text-white text-xl font-bold">
				Welcome home,
			</ion-text>
			<ion-text class="text-white leading-tight text-3xl sm:text-4xl font-bold">
				{{ user.fullName }}
			</ion-text>
		</div>

		<div
			class="bg-white rounded-3xl h-full w-full sm:w-4/12 flex justify-between  items-center min-w-[20rem] mt-6 sm:mt-0 p-6">
			<ion-text class="text-primary font-bold text-xl sm:text-lg">
				Your nerd score
			</ion-text>
			<DonutChart :bgColor="user.nerdScoreColor + '22'" :fgColor="user.nerdScoreColor" :score="user.score" :size="96"
				:total="user.expectedScore" />
		</div>
	</div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import DonutChart from '@app/components/core/DonutChart'
import { getPecentage } from '@root/utils/commons'

export default defineComponent({
	name: 'StatusBar',
	components: { DonutChart },
	setup () {
		const { user, isLoggedIn } = useAuth()

		const percentage = getPecentage(user.value.score, user.value.expectedScore)

		return { user, isLoggedIn, percentage }
	}
})
</script>
