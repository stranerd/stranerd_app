<template>
	<div>
		<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
			<div class="text-main_dark flex items-center">
				<ion-text class="text-base font-bold mr-3">History</ion-text>
			</div>		
		</div>

	
		<IonSkeletonText v-if="false" animated class="h-28 rounded-xl px-4" />
		<div class="flex bg-white rounded-xl flex-col ">
			<div class="header flex flex-col md:flex-row text-body text-gray font-bold w-full justify-between flex-wrap border-b border-new_gray md:px-8 md:py-4 2xl:p-8 p-4">
				<div class="w-1/2 flex justify-between">
					<span class="min-w-[12.5rem]"> Title</span>
					<span class="min-w-[12.5rem]"> Type</span>
				</div>
				<div class="w-1/2 flex justify-between">
					<span class="min-w-[12.5rem]"> Status</span>
					<span class="min-w-[12.5rem]"> Date</span>
				</div>
			</div>
			<div v-for="n in 5" :key="n" class="header flex flex-col md:flex-row text-body text-gray justify-between flex-wrap border-b border-new_gray md:px-8 md:py-4 2xl:p-8 p-4">
				<div class="w-1/2 flex justify-between">
					<span class="min-w-[12.5rem]"> UTME - Mathematics</span>
					<span class="min-w-[12.5rem]"> Test</span>
				</div>
				<div class="w-1/2 flex justify-between">
					<span class="min-w-[12.5rem] text-green"> 98%</span>
					<span class="min-w-[12.5rem]"> 16/02/2022</span>
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



