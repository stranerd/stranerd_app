<template>
	<div
		:class="`m-0    min-w-[17.5rem] w-full cardPadding  lg:border-0  rounded-3xl  flex flex-col justify-center items-center  gap-[0.2rem] box-border  !p-9 !px-7`"
		:style="`background: ${color};`"
	>

		<ion-icon
			v-if="icon"
			:icon="icon"
			class="text-white text-5xl h-12"
		/>
		<img src="../../../assets/images/New/flashCard.png" alt="flashCard" v-else>

		<ion-text class="font-extrabold text-white">
			{{ title }}
		</ion-text>

		<ion-text class="text-center text-white	 normalText font-normal">
			{{ subText }}
		</ion-text>

		<router-link :to="route">
			<ion-button
				class="btn-white min-w-[13rem] bg-transparent mb-4 text-white lg:text-base text-xs  font-bold"
				:style="`color: ${color};`"
			>
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
		},
		color: {
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
