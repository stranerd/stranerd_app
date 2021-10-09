<template>
	<ion-card
	
		:class="[ style ,' md:min-w-[246px] md:min-h-[246px] min-w-[143px] min-h-[150px]  md:rounded-xl rounded-md flex flex-col md:gap-4 gap-2 justify-center items-center pb-4 pt-2']"
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
			<span class="font-bold text-xs md:text-base text-main_dark">
				Timmy Martin
			</span>
			<img src="../../assets/images/icons/verified.svg" alt="ask a question" class="w-[10px] md:w-4">
		</div>

		<show-ratings :rating="4"/>
			
		<ion-button  class="font-bold capitalize md:text-base text-[9.69px] max-w-[100px] md:max-w-[198px] w-[198px] lg:w-full h-[21.8px] box-border" v-if="showButton">
			Request a session</ion-button>

	</ion-card>
</template>

<script>
import { IonCard, IonButton } from '@ionic/vue'
import Avatar from '@/application/components/core/Avatar.vue'
import ShowRatings from '@/application/components/core/ShowRatings.vue'
export default {
	name: 'TutorCard',
	components: {IonCard, Avatar, ShowRatings, IonButton },
	props:{
		style: {
			required: false,
			type: String,
		},
		showButton: {
			required: false,
			type: Boolean,
			default:false
		}

	}

}
</script>

<style scoped lang="scss">
ion-card{
	box-shadow: none !important;


}

	ion-button{
    --background: #F7F7FC;
    --color: #8B9EB1;
    --border-radius: .75rem;
    --border-width: .0625rem;
    --border-style: solid;
    --border-color: #8B9EB1;
	--padding-top: 1rem;
	--padding-bottom: 1rem;
	--box-shadow: none;

		@media (max-width: $sm) {
			 --border-radius:.454268rem;
			 --padding-right: 1rem;
			 --padding-left: 2rem;
			 --padding-top: 0.5rem;
			 --padding-bottom: 0.5rem;
		}

}
</style>