<template>
	<ion-card
	
		:class="[ style ,' md:min-w-[246px] md:min-h-[246px] min-w-[150px] min-h-[150px]  md:rounded-xl rounded-md flex flex-col md:gap-5 gap-2 justify-center items-center']"
	>
		<div class="relative">
			<avatar
				class="!h-[43px] !w-[43px] md:!h-[72px] md:!w-[72px] "
				:size="43"
			/>
			<i
				class="absolute rounded-full bottom-0 right-0 z-10 text-xl bg-green md:w-6 md:h-6 w-[14px] h-[14px]"
			/>
		</div>

		<div class="flex gap-2">
			<span class="font-bold text-xs md:text-base">
				Timmy Martin
			</span>
			<img src="../../assets/images/icons/verified.svg" alt="ask a question" class="w-[10px] md:w-4">
		</div>

		<show-ratings :rating="4"/>
			

	</ion-card>
</template>

<script>
import { IonCard } from '@ionic/vue'
import Avatar from '@/application/components/core/Avatar.vue'
import ShowRatings from '@/application/components/core/ShowRatings.vue'
export default {
	name: 'TutorCard',
	components: {IonCard, Avatar, ShowRatings },
	props:{
		style: {
			required: false,
			type: String,
		}
	}

}
</script>

<style scoped lang="scss">
ion-card{
	box-shadow: none !important;

}
</style>