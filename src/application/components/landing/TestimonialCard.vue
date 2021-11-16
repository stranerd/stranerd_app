<template>
	<ion-card>	  
		<!-- <div class="card h-full flex items-center">
			<div class="card-body">
				<p class="testimony mb-5">
					
				</p>
				<div class="flex gap-2 items-center">
					<div class="rounded-full overflow-hidden w-24 h-24">
						<img src="@app/assets/images/testimonials/eunice.jpeg" alt="testimonial image" class="w-full w-min-full h-min-full">
					</div>
					<div class="">
						<h3 class="testimonial-name">Eunice Apo</h3>
					</div>
				</div>
				<div class="flag">
					<img src="@app/assets/images/flags/nigeria.png" alt="flag image" class="flag-image">
				</div>
			</div>
		</div> -->
		<ion-card-header>
			<ion-card-subtitle>Card Subtitle</ion-card-subtitle>
			<div class="flex gap-2 items-center">
				<div class="rounded-full overflow-hidden w-24 h-24">
					<img src="@app/assets/images/testimonials/eunice.jpeg" alt="testimonial image" class="w-full w-min-full h-min-full">
				</div>
				<div class="">
					<ion-card-title class="testimonial-name">Eunice Apo</ion-card-title>
				</div>
			</div>
			<div class="flag">
				<img src="@app/assets/images/flags/nigeria.png" alt="flag image" class="flag-image">
			</div>
		</ion-card-header>

		<ion-card-content>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet. 
		</ion-card-content>
	</ion-card>
</template>

<script lang="ts">
// import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel } from '@ionic/vue'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from '@ionic/vue'
import { pin, walk, warning, wifi, wine } from 'ionicons/icons'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'TestimonialCard',
	components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
	setup() {
		return { warning }
	}
})
</script>