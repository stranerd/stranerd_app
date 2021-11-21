<template>
	<div
		:class="[  `m-0   cardPadding border ${colorClass}    rounded-xl  flex flex-col items-center md:gap-2 gap-[1rem] box-border  !p-4 md:!p-7 border border-faded_gray lg:border-0`]"
	>
    
		<ion-text class="font-bold text-2xl text-main_dark">
			{{title}}
		</ion-text>

	

		<div class="mt-1">
			<ion-button :to="route" class="btn-secondary   min-w-[7rem]  font-bold w-full mb-3">
				Test yourself
			</ion-button>
			<ion-button :to="route" class="btn-outline  text-dark_gray min-w-[7rem]  font-bold w-full">
				Study solutions
			</ion-button>
		</div>



	


	</div>
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
import { defineComponent,  } from 'vue'

export default defineComponent({
	name: 'TutorCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		title:{
			type:String,
			default:''
		},
		subText:{
			type:String,
			default:''
		},
		btnText:{
			type:String,
			default:''
		},
		route:{
			type:String,
			default:''
		},
		icon:{
			type:String
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
