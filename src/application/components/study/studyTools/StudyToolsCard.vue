<template>
	<div
		:class="`m-0  h-[17rem] min-w-[15.80rem] lg:min-w-[33%] w-full cardPadding border border-faded_gray    md:rounded-xl rounded-md flex flex-col items-center md:gap-2 gap-[1rem] box-border  p-5`"
	>
    
		<ion-icon
			class="text-dark_gray text-5xl"
			:icon="icon"
		/>

		<ion-text class="font-bold">
			{{title}}
		</ion-text>

		<ion-text class="text-center">
			{{subText}}
		</ion-text>

		<ion-button :to="route" class="btn-outline min-w-[12rem] bg-transparent text-dark_gray font-bold">
			{{btnText}}
		</ion-button>


	


	</div>
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
import { defineComponent,  } from 'vue'

export default defineComponent({
	name: 'TutorCard',
	props: {
		// colorClass: {
		// 	type: String,
		// 	default: 'bg-light_gray'
		// },
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
