<template>
	<div
		v-if="testPrep"
		:class="`m-0  h-[7.5rem] min-w-[16.5rem] cardPadding ${colorClass}  w-full rounded-xl  flex flex-col md:gap-2 gap-[1rem] box-border  p-5 `"
	>
		<div class="flex flex-col items-center justify-between w-full  mx-auto">
			<ion-text class="text-base text-left w-full text-main_dark font-bold ml-2">
				<!-- {{ testPrep.data.institutionId }} -->
				Jamb
			</ion-text>
			<ion-text class="text-base text-left w-full text-gray font-bold mt-1 ml-2">
				<!-- {{ testPrep.data.type }} -->
				Study > Mathematics (2021)
			</ion-text>

			<ion-progress-bar class="mt-6" value="0.5"></ion-progress-bar>
		</div>

	</div>
</template>

<script lang="ts">
import { calendar, play } from 'ionicons/icons'
import { IonProgressBar } from '@ionic/vue'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
import { TestPrepEntity } from '@modules/study'

export default defineComponent({
	name: 'Continue Study Card',
	components: { IonProgressBar },
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		testPrep: {
			required: true,
			type: TestPrepEntity
		}
	},
	setup () {
		return {
			formatNumber,
			calendar,
			play
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-progress-bar {
		height: .55rem !important;
		border-radius: 12px !important;
	}

	ion-progress-bar::part(progress) {
		border-radius: 120px !important;
	}

	ion-card {
		box-shadow: none !important;

	}
</style>
