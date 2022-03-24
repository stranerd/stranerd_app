<template>
	<div>
		<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
			<div class="text-main_dark flex items-center">
				<ion-text class="text-base font-bold mr-3">Q & A</ion-text>
			</div>		
		</div>

	
		<IonSkeletonText v-if="false" animated class="h-28 rounded-xl px-4" />
		<div class="showcase2">
			<dashboard-card :icon="helpCircleOutline" title="48" subtitle="Questions asked" iconClass="text-green text-heading2"/>
			<dashboard-card :icon="readerOutline" title="99" subtitle="Questions answered" iconClass="text-blue text-heading2" />
		
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonSkeletonText } from '@ionic/vue'
import { readerOutline, helpCircleOutline } from 'ionicons/icons'
import DashboardCard from './DashboardCard.vue'

export default defineComponent({
	name: 'ActivityView',
	components: {  IonSkeletonText, DashboardCard },
	setup () {
		return {helpCircleOutline, readerOutline}
	}
})
</script>
1