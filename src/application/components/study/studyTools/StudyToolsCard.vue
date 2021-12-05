<template>
	<div
		:class="`m-0  h-[13rem]  min-w-[16.5rem] w-full cardPadding bg-light_orange lg:border-0 border border-faded_gray    rounded-xl  flex flex-col justify-center items-center md:gap-2 gap-[0.2rem] box-border  p-5`"
	>

		<ion-icon
			:icon="icon"
			class="text-main_dark text-5xl"
		/>

		<ion-text class="font-bold text-main_dark">
			{{ title }}
		</ion-text>

		<ion-text class="text-center text-main_dark normalText ">
			{{ subText }}
		</ion-text>

		<router-link :to="route">
			<ion-button
				class="btn-secondary min-w-[7rem] bg-transparent mb-4 text-white lg:text-base text-xs  font-bold">
				{{ btnText }}
			</ion-button>
		</router-link>

	</div>
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'TutorCard',
	props: {
		// colorClass: {
		// 	type: String,
		// 	default: 'bg-light_gray'
		// },
		title: {
			type: String,
			default: ''
		},
		subText: {
			type: String,
			default: ''
		},
		btnText: {
			type: String,
			default: ''
		},
		route: {
			type: String,
			default: ''
		},
		icon: {
			type: String
		}
	},
	setup () {
		return {
			calendar,
			play
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
