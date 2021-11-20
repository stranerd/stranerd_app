<template>
	<div
		:class="`m-0  h-[6.2rem] min-w-[15.80rem] cardPadding ${colorClass}  md:rounded-xl rounded-md flex flex-col md:gap-2 gap-[1rem] box-border  p-5 border border-faded_gray lg:border-0`"
	>
		<div class="flex items-center justify-between w-full">
			<div class="bg-faded_gray min-h-[57px] min-w-[57px] grid place-items-center rounded-md mr-5">
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
