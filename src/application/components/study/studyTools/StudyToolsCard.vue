<template>
	<div
		:class="`m-0 min-w-[17.5rem] w-full cardPadding  lg:border-0  rounded-3xl  flex flex-col justify-center items-center  gap-[0.2rem] box-border  !p-5 `"
		:style="`background: ${color};`"
	>
		<ion-icon
			v-if="icon"
			:icon="icon"
			class="text-white lg:text-5xl text-3xl h-8 lg:h-12"
		/>
		<img v-else alt="flashCard" class="h-8 lg:h-12" src="../../../assets/images/New/flashCard.png">

		<ion-text class="font-extrabold text-white text-xs lg:text-base mt-3">
			{{ title }}
		</ion-text>

		<ion-text class="text-center text-white	 normalText font-normal">
			{{ subText }}
		</ion-text>

		<router-link v-if="route" :to="route">
			<ion-button
				:style="`color: ${color};`"
				class="btn-white min-w-[13rem] bg-transparent mb-4 text-white lg:text-base text-xs  font-bold"
			>
				{{ btnText }}
			</ion-button>
		</router-link>
		<ion-button v-if="onClick"
			:style="`color: ${color};`"
			class="btn-white min-w-[13rem] bg-transparent mb-4 text-white lg:text-base text-xs  font-bold"
			@click="onClick">
			{{ btnText }}
		</ion-button>

	</div>
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'StudyToolsCard',
	props: {
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
			required: false
		},
		icon: {
			type: String
		},
		color: {
			type: String,
			required: true
		},
		onClick: {
			type: Function,
			required: false
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
