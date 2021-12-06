<template>
	<div
		v-if="testPrep"
		:class="[  `m-0   cardPadding border ${colorClass}    rounded-xl  flex flex-col items-center md:gap-2 gap-[1rem] box-border  !p-4 md:!p-7 border border-faded_gray lg:border-0`]"
	>
    
		<ion-text class="font-bold text-2xl text-main_dark">
			{{testPrep.name}}
		</ion-text>

	

		<div class="mt-1">
			<router-link to="/study/testprep/view">
				<ion-button  class="btn-secondary   min-w-[7rem]  font-bold w-full mb-3">
					Test yourself
				</ion-button>
			</router-link>
		
			<ion-button to="#" class="btn-outline  text-main_dark min-w-[7rem]  font-bold w-full">
				Study solutions
			</ion-button>
		</div>



	


	</div>
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
import { defineComponent,  } from 'vue'
import { TestPrepEntity } from '@root/modules/study'

export default defineComponent({
	name: 'TutorCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		testPrep:{
			type:TestPrepEntity,
			required: true
		}
	},
	setup() {
		return {
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
