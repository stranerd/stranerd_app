<template>
	<div
		:class="`m-0  h-[7.5rem] min-w-[16.5rem] cardPadding ${colorClass}  w-full rounded-xl  flex flex-col md:gap-2 gap-[1rem] box-border  p-5 border border-faded_gray lg:border-0`"
	>
		<div class="flex flex-col items-center justify-between w-full  mx-auto">
		
             
			<ion-text class="text-xl text-left w-full text-main_dark font-bold ml-2">
				{{testPreps.name}}
			</ion-text>
			<ion-text class="text-sm text-left w-full text-main_dark font-bold mt-1 ml-2">
				{{testPreps.data}}
			</ion-text>

			<ion-progress-bar value="0.5" class="mt-6"></ion-progress-bar>
		</div>

	</div>
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
import { IonProgressBar } from '@ionic/vue'
import { defineComponent,  } from 'vue'
import { formatNumber } from '@utils/commons'
import { TestPrepEntity } from '@root/modules/study'


export default defineComponent({
	name: 'Continue Study Card',
	components: { IonProgressBar },
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		testPreps:{
			required:true,
			type: TestPrepEntity
		}
			
		
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
	ion-progress-bar{
		height: .55rem !important;
		border-radius: 12px !important;
	}

	ion-progress-bar::part(progress){
		border-radius: 120px !important;
	}
	ion-card {
		box-shadow: none !important;

	}
</style>
