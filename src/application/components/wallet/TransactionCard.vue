<template>
	<ion-card
	
		:class="[ style ,' md:min-w-[21rem] md:h-[8.25rem]  min-w-[12.5rem] h-[7rem]  md:rounded-xl rounded-md flex flex-col md:gap-6 gap-[1rem] box-border  p-5']"
	>
		<div class="flex items-center text-xs md:text-base font-bold text-dark_gray gap-2">
			<Coins :gold="false" :size="24"/>
			<span>+24</span>
			<span>|</span>
			<span>Aug 10, 2021</span>
		</div>

		<span class="text-xs md:text-base font-normal text-dark">
			You got coins for best answer.
		</span>



	</ion-card>
</template>

<script>
import { IonCard } from '@ionic/vue'
import { calendar, time } from 'ionicons/icons'
import Coins from '../core/Coins.vue'
export default {
	name: 'TutorCard',
	components: {IonCard,  Coins },
	props:{
		style: {
			required: false,
			type: String,
		}
	},
	setup(){
		return{
			calendar, time
		}
	}

}
</script>

<style scoped lang="scss">
ion-card{
	box-shadow: none !important;

}
</style>