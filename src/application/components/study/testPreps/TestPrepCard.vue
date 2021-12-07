<template>
	<div
		:class="[`m-0 lg:min-w-[18rem] min-w-[16.5rem] h-40 lg:h-44 ${colorClass} rounded-xl flex flex-col items-center justify-between md:gap-2 gap-[1rem] box-border p-6 md:!px-4`]">

		<div class="w-full justify-between items-center flex">
			<ion-text class="font-bold text-xl text-main_dark">
				<!-- {{ testPrep.name }} -->
				Jamb
			</ion-text>

			<ion-icon

				:icon="ellipsisVertical"
				class="text-gray text-2xl"
			/>

		</div>


		<div class="flex items-center justify-between gap-3">
			<router-link to="/study/preps/view">
				<ion-button class="btn-primary     font-bold w-full lg:min-w-[7.5rem] w-28">
					Test 
				</ion-button>
			</router-link>

			<ion-button class="btn-outline  text-primary   font-bold w-full  lg:min-w-[7.5rem] w-28" to="#">
				solutions
			</ion-button>
		</div>
	</div>
</template>

<script lang="ts">
import { calendar, play, ellipsisVertical } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { TestPrepEntity } from '@modules/study'

export default defineComponent({
	name: 'TestPrepListCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		testPrep: {
			type: TestPrepEntity,
			required: true
		}
	},
	setup () {
		return {
			ellipsisVertical,
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
