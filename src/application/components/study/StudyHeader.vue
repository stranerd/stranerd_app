<template>
	<div class="bg-primary h-40 sm:h-36 rounded-b-xl sm:rounded-3xl flex flex-col sm:flex-row 
	justify-between sm:items-center sm:mt-4 
	-mt-8 -ml-6 sm:mx-0 -mr-2
	p-9
	">
		<div class="flex flex-col  w-full text-left" >
		
			<ion-text class="text-white leading-tight text-3xl font-bold">
				Your library
			</ion-text>
			<ion-text class="text-white text-base font-bold">
				Collection of your created and saved study materials
			</ion-text>

		</div>

		<div class="bg-white p-3 px-6 rounded-xl grid place-items-center    ">
			<div  class="flex items-center cursor-pointer" @click="setOpen(true, $event)">
				<ion-text class="text-primary mr-1 font-bold">
					Create
				</ion-text>
				<ion-icon
					:icon=' !isOpenRef ? chevronDown : chevronUp'
					class="text-primary  text-xl"
				/>
			</div>
		</div>
		
		
	</div>
</template>

<script>

import { useAuth } from '@root/application/composable/auth/auth'
import { chevronDown, chevronUp,  } from 'ionicons/icons'

export default {
	name: 'StatusBar',

	setup() {
		const {user} = useAuth()

		return {
			user, chevronDown, chevronUp,
		}
	}


}
</script>

<style>

</style>