<template>
	<div 
		:class="`w-full ${isFirst ? 'bg-butter_yellow' : 'bg-light_gray'}  md:min-h-[180px] min-h-[150px] !m-0 cardPadding  md:rounded-xl rounded-md flex flex-col md:gap-2 gap-2 justify-center items-center`">
		<div class="relative">
			<avatar
				class="!h-[43px] !w-[43px] md:!h-[60px] md:!w-[60px] "
				:size="45"
			/>
			<i
				class="absolute rounded-full bottom-0.5 right-1 z-10 text-xl bg-green md:w-4 md:h-4 w-[14px] h-[14px]"
			/>
		</div>

		<div class="flex gap-2">
			<span class="font-bold normalText text-main_dark">
				Timmy Martin
			</span>
			<img src="../../assets/images/icons/verified.svg" alt="ask a question" class="w-[15px] md:w-4">
		</div>

		<show-ratings :rating="4"/>
			
		<ion-button @click="requestSession" class="w-full font-bold capitalize text-base max-w-[198px]" v-if="showButton">
			Request a session</ion-button>

	</div>	

</template>

<script lang="ts">
import { IonButton  } from '@ionic/vue'
import Avatar from '@/application/components/core/Avatar.vue'
import ShowRatings from '@/application/components/core/ShowRatings.vue'
import { componentName, showModal } from  '../../../modules/core/Modal'

export default {
	name: 'Home TutorCard',
	components: { Avatar, ShowRatings, IonButton },
	props:{
		style: {
			required: false,
			type: String,
		},
		showButton: {
			required: false,
			type: Boolean,
			default:false
		},
		isFirst: {
			type: Boolean,
			default: false
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