<template>
	<router-link
		:class="`m-0  h-[7.5rem] min-w-[16.5rem] cardPadding bg-white  w-full rounded-xl  flex flex-col md:gap-2 gap-[1rem] box-border  p-5 border border-faded_gray lg:border-0`"
		:to="`/study/tests/${test.id}/take`"
	>
		<div class="flex flex-col items-center justify-between w-full mx-auto capitalize">
			<div class="w-full flex justify-between items-center">
				<ion-text class="text-base text-left w-full text-main_dark font-bold">
					{{ test.name }}
				</ion-text>

				<ion-icon 
					class="text-3xl text-gray "
					:icon="arrowForward"
				/>
			</div>

			<ion-progress-bar class="mt-10" value="0.5" />
		</div>
	</router-link>
</template>

<script lang="ts">
import { calendar, play, arrowForward } from 'ionicons/icons'
import { IonProgressBar } from '@ionic/vue'
import { defineComponent } from 'vue'
import { formatNumber } from '@utils/commons'
import { TestEntity } from '@modules/study'

export default defineComponent({
	name: 'ContinueTestCard',
	components: { IonProgressBar },
	props: {
	
		test: {
			required: true,
			type: TestEntity
		}
	},
	setup () {
		return {
			formatNumber,arrowForward,
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
