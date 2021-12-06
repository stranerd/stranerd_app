<template>
	<div class="bg-primary h-40 sm:h-36 rounded-b-xl sm:rounded-3xl flex flex-col sm:flex-row 
	justify-between sm:items-center sm:mt-4 
	-mt-8 -ml-6 sm:mx-0 -mr-2
	sm:p-0 p-4
	">
		<div class="flex flex-col ml-4 sm:ml-8 w-full text-left" >
			<ion-text class="text-white text-xl font-bold">
				Welcome home,
			</ion-text>
			<ion-text class="text-white leading-tight text-3xl sm:text-4xl font-bold">
				{{user? user.fullName : 'Anonymous'}}
			</ion-text>
		</div>

		<div class="bg-white rounded-3xl h-full w-full sm:w-4/12 flex justify-center gap-8 items-center min-w-[20rem]  px-4 mt-1 sm:mt-0 p-8" >
			<ion-text class="text-primary font-bold text-sm sm:text-lg">
				Your nerd score
			</ion-text>
			<DonutChart :score="user ? user.score: 0" :size="110" :total="user ? user.expectedScore : 100" />
		</div>
		
		
	</div>
</template>

<script>

import { useAuth } from '@root/application/composable/auth/auth'
export default {
	name: 'StatusBar',

	setup() {
		const {user} = useAuth()

		return {
			user
		}
	}


}
</script>

<style>

</style>