<template>
	<ion-page>
		<ion-content :fullscreen="true" class=" mx-auto">
			<div class="w-full flex justify-between">
				<span class="text-[24px] font-bold text-dark_gray">
					Featured tutors
				</span>

				<slider-controller/>

				<div class="text-primary flex items-center font-bold text-base">
					<span>view all</span>
					<ion-icon :icon="chevronForwardOutline" class="text-2xl "></ion-icon>	
				</div>
			</div>

			<div class="flex md:gap-6 gap-3 mt-3">
				<tutor-card/>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage,  IonContent, IonIcon } from '@ionic/vue'
import { chevronForwardOutline, chevronBackOutline, ellipse } from 'ionicons/icons'
import SliderController from '@/application/components/core/nav/sliderController.vue'
import TutorCard from '@/application/components/tutors/TutorCard.vue'


export default  {
	name: 'Home',
	components: { IonContent, IonPage, IonIcon, SliderController, TutorCard, },
	setup(){
		return{
			chevronForwardOutline, chevronBackOutline, ellipse
		}
	}
}
</script>
