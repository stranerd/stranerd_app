<template>
	<div>
		<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
			<div class="text-main_dark flex items-center">
				<ion-text class="text-base font-bold mr-3">Study material</ion-text>
			</div>		
		</div>

	
		<IonSkeletonText v-if="false" animated class="h-28 rounded-xl px-4" />
		<div class="showcase2">
			<dashboard-card :icon="timeOutline" title="46m" subtitle="Notes uploaded" iconClass="text-pink text-heading2" />
			<dashboard-card :icon="timeOutline" title="46m" subtitle="Flashcards created" iconClass="text-pink text-heading2" />
			<dashboard-card :icon="timeOutline" title="46m" subtitle="Videos added" iconClass="text-pink text-heading2" />
			<dashboard-card :icon="timeOutline" title="46m" subtitle="Folders created" iconClass="text-pink text-heading2" />
		
		
			<!-- <QuestionListCard v-for="question in questions" :key="question.hash" :question="question" /> -->
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonSkeletonText } from '@ionic/vue'
import { timeOutline, rocketOutline } from 'ionicons/icons'
import DashboardCard from './DashboardCard.vue'

export default defineComponent({
	name: 'ActivityView',
	components: {  IonSkeletonText, DashboardCard },
	setup () {
		return {rocketOutline, timeOutline}
	}
})
</script>
