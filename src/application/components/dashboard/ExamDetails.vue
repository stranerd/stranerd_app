<template>
	<div>
		<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
			<div class="text-main_dark flex items-center">
				<ion-text class="text-base font-bold mr-3">Details</ion-text>
			</div>		
		</div>

	
		<IonSkeletonText v-if="false" animated class="h-28 rounded-xl px-4" />
		<div class="showcase2">
			<dashboard-card :icon="documentOutline" title="34" subtitle="Notes uploaded" iconClass="text-pink text-heading2" />
			<dashboard-card :icon="copyOutline" title="50" subtitle="Flashcards created" iconClass="text-purple text-heading2" />
			<dashboard-card :icon="playCircleOutline" title="20" subtitle="Videos added" iconClass="text-orange text-heading2" />
			<dashboard-card :icon="folderOutline" title="13" subtitle="Folders created" iconClass="text-blue text-heading2" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonSkeletonText } from '@ionic/vue'
import {  copyOutline, documentOutline, playCircleOutline, folderOutline } from 'ionicons/icons'
import DashboardCard from './DashboardCard.vue'

export default defineComponent({
	name: 'ActivityView',
	components: {  IonSkeletonText, DashboardCard },
	setup () {
		return {copyOutline,  documentOutline, playCircleOutline, folderOutline}
	}
})
</script>
