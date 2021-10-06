<template>
	<ion-page>
		<ion-content :fullscreen="true" class=" mx-auto">
			<FeaturedTutors/>
			<RecentQuestions />
	
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage,  IonContent, IonIcon } from '@ionic/vue'
import SliderController from '@/application/components/core/nav/sliderController.vue'
import FeaturedTutors from '@/application/components/dashboard/FeaturedTutors.vue'
import RecentQuestions from '@/application/components/dashboard/RecentQuestions.vue'



export default  {
	name: 'Home',
	components: { IonContent, IonPage,  FeaturedTutors, RecentQuestions,  },

}
</script>
