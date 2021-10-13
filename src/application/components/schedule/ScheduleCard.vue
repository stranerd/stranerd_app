<template>
	<ion-card
	
		:class="[ style ,' md:min-w-[21rem] md:h-[14rem]  min-w-[12.5rem] h-[10.125rem]  md:rounded-xl rounded-md flex flex-col md:gap-6 gap-[1rem] box-border  p-6']"
	>
		<span class="text-base md:text-2xl font-bold">
			Organic Chemistry
		</span>

		<div class="flex items-center gap-3">
			<avatar
				class="!h-[14px] !w-[14px] md:!h-[24px] md:!w-[24px] "
				:size="24"
			/>
			<span class="normalText font-bold text-dark_gray">Session with Jerry</span>
		</div>

		<div class="flex items-center gap-3">
			<ion-icon
				:icon="calendar" 
				class="!h-[14px] !w-[14px] md:!h-[24px] md:!w-[24px] text-icon_inactive"
			/>
			<span class="normalText font-bold text-dark_gray">Oct 10, 2021</span>
		</div>

		<div class="flex items-center gap-3">
			<ion-icon
				:icon="time" 
				class="!h-[14px] !w-[14px] md:!h-[24px] md:!w-[24px] text-icon_inactive"
			/>
			<span class="normalText font-bold text-dark_gray">10:00 - 11:00</span>
		</div>

	

			

	</ion-card>
</template>

<script>
import { IonCard } from '@ionic/vue'
import Avatar from '@/application/components/core/Avatar.vue'
import {  IonIcon } from '@ionic/vue'
import { calendar, time } from 'ionicons/icons'
export default {
	name: 'TutorCard',
	components: {IonCard, Avatar, IonIcon },
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