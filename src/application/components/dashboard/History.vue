<template>
	<div>
		<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
			<div class="text-main_dark flex items-center">
				<ion-text class="text-base font-bold mr-3">History</ion-text>
			</div>		
		</div>

	
		<IonSkeletonText v-if="false" animated class="h-28 rounded-xl px-4" />
		<div class="flex bg-white rounded-xl flex-col md:px-8 md:py-4 2xl:p-8 p-4">
			<div class=" flex flex-col header text-gray font-bold w-full justify-between flex-wrap">
			
				<div class="w-1">
					<span class="md:w-1/4 w-1/2"> Title</span>
					<span class="md:w-1/4 w-1/2"> Type</span>
				</div>

				<div class="w-1">
					<span class="md:w-1/4 w-1/2"> Title</span>
					<span class="md:w-1/4 w-1/2"> Title</span>
				</div>
		
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonSkeletonText } from '@ionic/vue'
import {  checkmarkCircleOutline, receiptOutline, timeOutline, schoolOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'HistoryView',
	components: {  IonSkeletonText },
	setup () {
		return {checkmarkCircleOutline,  receiptOutline, timeOutline, schoolOutline}
	}
})
</script>



