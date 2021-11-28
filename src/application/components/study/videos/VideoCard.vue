<template>
	<div
		:class="`m-0  h-[18rem]  md:!w-[300px] !w-[265px] ${colorClass}  rounded-xl  flex flex-col md:gap-2 gap-[1rem] box-border  pb-5 border border-faded_gray lg:border-0`"
	>
		<div class="flex flex-col items-center justify-between w-full">
			<div class="bg-faded_gray min-h-[10.5rem] min-w-[57px] w-full grid place-items-center rounded-md ">
				<div class="bg-white rounded-full grid place-items-center h-16 w-16">
					<ion-icon
						class="text-faded_gray text-3xl"
						:icon="play"
					/>
				</div>
		
			</div>
            
			<ion-text class="text-sm text-main_dark font-bold p-5 pb-1">
				Work and Energy 
				- Introduction to
				University physics
			</ion-text>
		</div>

		<div class="w-full flex items-center justify-between  px-5">
			<ShowRatings :rating="4"/>

			<div class="flex items-center">
				<ion-text class="text-xs font-bold text-main_dark mr-3">
					Timmy
				</ion-text>
				<Avatar :size="24"/>
			</div>
		</div>

	</div>
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
import { defineComponent,  } from 'vue'
import { formatNumber } from '@utils/commons'
import ShowRatings from '@app/components/core/ShowRatings.vue'
import Avatar from '@app/components/core/Avatar.vue'
import { VideoEntity } from '@root/modules/study'

export default defineComponent({
	name: 'TutorCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		video:{
			type:VideoEntity,
			required:true
		}
	},
	setup() {
		return {
			formatNumber,
			calendar,
			play
		}
	},
	components: { ShowRatings, Avatar }
})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
