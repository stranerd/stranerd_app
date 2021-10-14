<template>
	<div :class="`md:min-w-[17rem] md:h-[10.5rem] lg:w-full !m-0 min-w-[12.5rem] h-[10.125rem]  md:rounded-xl rounded-md flex flex-col md:gap-3 gap-[1rem] box-border  cardPadding`">
		<span class="heading font-bold text-dark_gray">
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

	

			

	</div>
</template>

<script lang="ts">
import Avatar from '@/application/components/core/Avatar.vue'
import {  IonIcon } from '@ionic/vue'
import { calendar, time } from 'ionicons/icons'
export default {
	name: 'TutorCard',
	components: { Avatar, IonIcon },
	props:{
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
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