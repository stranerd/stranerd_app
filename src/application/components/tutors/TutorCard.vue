<template>
	<div
		class=" w-full  md:rounded-xl rounded-md flex flex-col md:gap-2 gap-1 cardPadding justify-center items-center"
	>
		<div class="relative">
			<avatar
				:size="45"
			/>
			<i
				class="absolute rounded-full bottom-0 right-0 z-10 text-xl bg-green md:w-4 md:h-4 w-[14px] h-[14px]"
			/>
		</div>

		<div class="flex gap-2">
			<span class="font-bold normalText text-main_dark">
				Timmy Martin
			</span>
			<img src="../../assets/images/icons/verified.svg" alt="ask a question" class="w-[14px] md:w-4">
		</div>

		<show-ratings :rating="4"/>
	
		<a @click="requestSession"  class="mt-2 font-bold  normalText border-[1px] py-2 md:py-2 md:px-4 px-2 text-icon_inactive rounded-xl border-icon_inactive">
			Request a session
		</a>

	</div>	

</template>

<script lang="ts">
import Avatar from '@/application/components/core/Avatar.vue'
import ShowRatings from '@/application/components/core/ShowRatings.vue'
import { componentName, showModal } from  '../../../modules/core/Modal'

export default {
	name: 'TutorCard',
	components: { Avatar, ShowRatings },
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

</style>