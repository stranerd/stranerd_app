<template>
	<ion-page class="pt-8">
		<ion-content :fullscreen="true" class=" mx-auto">
			
			<FeaturedTutors/>
			<RecentQuestions />
			<UpcomingEvent/>
			<RecentTransaction />
			
			
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage,  IonContent } from '@ionic/vue'
import FeaturedTutors from '@/application/components/dashboard/FeaturedTutors.vue'
import RecentQuestions from '@/application/components/dashboard/RecentQuestions.vue'
import UpcomingEvent from '@/application/components/dashboard/UpcomingEvent.vue'
import RecentTransaction from '@/application/components/dashboard/RecentTransaction.vue'
import { defineAsyncComponent } from 'vue'




export default  {
	name: 'home',
	components: { IonContent, IonPage,  FeaturedTutors, RecentQuestions, UpcomingEvent, RecentTransaction },

}
</script>
