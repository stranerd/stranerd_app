<template>
	<div
		:class="`m-0  h-[7.5rem] min-w-[16.5rem] cardPadding ${colorClass}  w-full rounded-xl  flex flex-col md:gap-2 gap-[1rem] box-border  p-5 border border-faded_gray lg:border-0`"
	>
		<div class="flex flex-col items-center justify-between w-full  mx-auto">
		
             
			<ion-text class="text-xl text-left w-full text-main_dark font-bold ml-2">
				JAMB
			</ion-text>
			<ion-text class="text-sm text-left w-full text-main_dark font-bold mt-1 ml-2">
				Study > Mathematics (2021)
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
