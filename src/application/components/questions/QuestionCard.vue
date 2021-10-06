<template>
	<ion-card
	
		:class="[ style ,' md:min-w-[336px] md:h-[184px]  min-w-[242px] h-[162px]  md:rounded-xl rounded-md flex flex-col md:gap-5 gap-[16px] box-border  p-6']"
	>
		<div class="flex items-center justify-between w-full">
			<div class="flex items-center gap-2">
				<avatar
					class="!h-[14px] !w-[14px] md:!h-[24px] md:!w-[24px] "
					:size="24"
				/>
				<span class="font-bold text-dark_gray text-xs md:text-base">
					Timmy Martin
				</span>
			</div>

			<span class="font-bold text-xs md:text-base text-icon_inactive">
				30m ago    
			</span>
		
		
		</div>

		<div class="text-xs md:text-base">
			<span>
				From the top of a building with a height
				degrees to the horizontal plane at...... 
			</span>
		
		</div>

		<div class="text-xs md:text-base">
			<span class="font-bold text-base text-icon_inactive">
				5 answers   
			</span>
		
		</div>

			

	</ion-card>
</template>

<script>
import { IonCard } from '@ionic/vue'
import Avatar from '@/application/components/core/Avatar.vue'
export default {
	name: 'TutorCard',
	components: {IonCard, Avatar },
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