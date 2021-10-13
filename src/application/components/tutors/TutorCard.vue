<template>
	<ion-card
	
		:class="[ style ,' md:min-w-[260px] md:min-h-[260px] min-w-[150px] min-h-[150px]  md:rounded-xl rounded-md flex flex-col md:gap-5 gap-2 justify-center items-center']"
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
			
		<ion-button @click="requestSession" class="w-full font-bold capitalize text-base max-w-[198px]" v-if="showButton">
			Request a session</ion-button>

	</ion-card>	

</template>

<script lang="ts">
import { IonCard, IonButton } from '@ionic/vue'
import Avatar from '@/application/components/core/Avatar.vue'
import ShowRatings from '@/application/components/core/ShowRatings.vue'
import { componentName, showModal } from  '../../../modules/core/Modal'

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

	},
	setup(props: any) {

		const requestSession = () => {
			componentName.value = 'requestSession'
			showModal.value = true
		}

		return {
			requestSession
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
	--background-hover:transparent !important;

		@media (max-width: $sm) {
			 --border-radius:.454268rem !important;
			 --padding-top: 0.8rem !important;
			 --padding-bottom: 0.8rem !important;
			 --padding-right: 0.5rem !important;
			 --padding-left: 0.5rem !important;
			 max-width: 135px !important;
             font-size: 10px !important;
             max-height: 22px !important;
		}

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


}
</style>