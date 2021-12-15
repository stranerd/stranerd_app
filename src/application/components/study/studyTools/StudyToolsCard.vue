<template>



	<router-link v-if="route" :to="route">
		<ion-button
			:style="`color: ${color};`"
			class="btn-white w-full  bg-transparent mb-4 text-white lg:text-base text-xs  font-bold"
		>
			{{ btnText }}
		</ion-button>
	</router-link>
	<ion-button v-if="onClick"
		:style="`color: ${color};`"
		class="btn-white w-full  bg-transparent mb-4 text-white lg:text-base text-xs  font-bold"
		@click="onClick">
		{{ btnText }}
	</ion-button>

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
