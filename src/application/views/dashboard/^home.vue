<template>
	<ion-page>
		<ion-content :fullscreen="true" class=" mx-auto">
			<div class="w-full lg:w-[84%] lg:ml-[16%] grid grid-cols-12">
				<FeaturedTutors/>
				<RecentQuestions />
				<UpcomingEvent/>
				<RecentTransaction />
			</div>	
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage,  IonContent } from '@ionic/vue'
import FeaturedTutors from '@/application/components/dashboard/FeaturedTutors.vue'
import RecentQuestions from '@/application/components/dashboard/RecentQuestions.vue'
import UpcomingEvent from '@/application/components/dashboard/UpcomingEvent.vue'
import RecentTransaction from '@/application/components/dashboard/RecentTransaction.vue'



export default  {
	name: 'home',
	components: { IonContent, IonPage,  FeaturedTutors, RecentQuestions, UpcomingEvent, RecentTransaction,  },

}
</script>
