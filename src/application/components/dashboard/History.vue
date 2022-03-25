<template>
	<div>
		<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
			<div class="text-main_dark flex items-center">
				<ion-text class="text-base font-bold mr-3">History</ion-text>
			</div>		
		</div>

	
		<IonSkeletonText v-if="false" animated class="h-28 rounded-xl px-4" />
		<div class="flex bg-white rounded-xl flex-col md:px-8 md:py-4 2xl:p-8 p-4">
			<ion-text class="text-heading2 text-main_dark font-bold">
				25%
			</ion-text>
			<IonProgressBar value="25" class="mt-4"/>
			<ion-text class="mt-4 text-gray">Finish all tests preps and study plans to complete. </ion-text>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonSkeletonText, IonProgressBar } from '@ionic/vue'
import {  checkmarkCircleOutline, receiptOutline, timeOutline, schoolOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'ProgressView',
	components: {  IonSkeletonText, IonProgressBar },
	setup () {
		return {checkmarkCircleOutline,  receiptOutline, timeOutline, schoolOutline}
	}
})
</script>


<style lang="scss" scoped>
	ion-progress-bar {
		height: .5rem !important;
		border-radius: 12px !important;
		@media (max-width: 768px) {
			height: .25rem !important;
		}
	}

	ion-progress-bar::part(progress) {
		border-radius: 120px !important;
	}
</style>
