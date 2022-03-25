<template>
	<div>
		<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
			<div class="text-main_dark flex items-center">
				<ion-text class="text-base font-bold mr-3">Test prep</ion-text>
			</div>		
		</div>

	
		<IonSkeletonText v-if="false" animated class="h-28 rounded-xl px-4" />
		<div>
			<dashboard-card :icon="receiptOutline" title="48" subtitle="Test taken" iconClass="text-blue text-heading2" />
			<dashboard-card :icon="checkmarkCircleOutline" title="36/48" subtitle="Test passed" iconClass="text-green text-heading2" />
			<dashboard-card :icon="timeOutline" title="24m (per test)" subtitle="Average pace" iconClass="text-pink text-heading2" />
			<dashboard-card :icon="schoolOutline" title="95%" subtitle="Average grade" iconClass="text-purple text-heading2" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonSkeletonText } from '@ionic/vue'
import {  checkmarkCircleOutline, receiptOutline, timeOutline, schoolOutline } from 'ionicons/icons'
import DashboardCard from './DashboardCard.vue'

export default defineComponent({
	name: 'Test Prep',
	components: {  IonSkeletonText, DashboardCard },
	setup () {
		return {checkmarkCircleOutline,  receiptOutline, timeOutline, schoolOutline}
	}
})
</script>
