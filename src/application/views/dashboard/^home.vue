<template>
	<ion-page>
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



export default  {
<<<<<<< HEAD
	name: 'home',
	components: { IonContent, IonPage, IonIcon, SliderController, TutorCard, },
	setup(){
		return{
			chevronForwardOutline, chevronBackOutline, ellipse
		}
	}
=======
	name: 'Home',
	components: { IonContent, IonPage,  FeaturedTutors, RecentQuestions, UpcomingEvent, RecentTransaction,  },

>>>>>>> de73c6ec358a2fa283a571cdd0f3fcad50c072e1
}
</script>
