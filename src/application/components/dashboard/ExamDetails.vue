<template>
	<div>
		<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
			<div class="text-main_dark flex items-center">
				<ion-text class="text-base font-bold mr-3">Details</ion-text>
			</div>		
		</div>

	
		<IonSkeletonText v-if="false" animated class="h-28 rounded-xl px-4" />
		<div class="showcase2">
			<dashboard-card :icon="receiptOutline" title="UTME" subtitle="Exam" iconClass="text-blue text-heading2" />
			<dashboard-card :icon="calendarOutline" title="6 May 2022" subtitle="Exam date" iconClass="text-green text-heading2" />
			<dashboard-card :icon="timeOutline" title="62 days" subtitle="Time left to study" iconClass="text-pink text-heading2" />
			<dashboard-card :icon="discOutline" title="320" subtitle="Target score" iconClass="text-purple text-heading2" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonSkeletonText } from '@ionic/vue'
import {  calendarOutline, receiptOutline, timeOutline, discOutline } from 'ionicons/icons'
import DashboardCard from './DashboardCard.vue'

export default defineComponent({
	name: 'ActivityView',
	components: {  IonSkeletonText, DashboardCard },
	setup () {
		return {calendarOutline,  receiptOutline, timeOutline, discOutline}
	}
})
</script>
