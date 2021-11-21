<template>
	<div
		:class="`m-0  h-[7.5rem] min-w-[16.5rem] cardPadding ${colorClass}   rounded-xl  flex flex-col  items-center justify-center md:gap-2 gap-[1rem] box-border  p-5 px-10 border border-faded_gray lg:border-0`"
	>
		<div class="flex items-center justify-between w-full  mx-auto">
			<div class="bg-icon_inactive min-h-[60px] min-w-[60px] grid place-items-center rounded-md mr-5 ml-2">
				<ion-icon
					class="text-white text-2xl"
					:icon="play"
				/>
			</div>
            
			<ion-text class="text-sm text-main_dark font-bold">
				Work and Energy 
				Introduction to
				University Physics
			</ion-text>
		</div>

	


	</div>
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
import { defineComponent,  } from 'vue'
import { formatNumber } from '@utils/commons'


export default defineComponent({
	name: 'TutorCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
	},
	setup() {
		return {
			formatNumber,
			calendar,
			play
		}
	},
})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
