<template>
	<!-- <ion-card>	   -->
	<div class="h-full flex items-start">
		<div class="card-arrow border" :class="secondCard ? 'border-light_blue' : 'border-white'"></div>
		<div class="card relative w-44 lg:w-80 rounded-tl-none rounded-xl h-full flex items-center" :class="secondCard ? 'bg-light_blue' : 'bg-white'">
			<div class="card-body px-5 py-8">
				<div class="my-3" v-for="(paragraph, i) in testimony.testimonies" :key="i">
					<p class="testimony text-xs lg:text-base font-normal">
						{{ paragraph }}
					</p>
				</div>
				<div class="flex gap-2 my-3 items-center">
					<div class="rounded-full overflow-hidden w-14 h-14 flex items-center justify-center">
						<img :src="require('@app/assets/images/testimonials/' + testimony.image + '.jpeg')" alt="testimonial image" class="w-full w-min-full h-min-full">
					</div>
					<div class="">
						<h3 class="testimonial-name font-bold text-xs lg:text-base">{{ testimony.name }}</h3>
					</div>
				</div>
				<div class="flag">
					<img :src="require('@app/assets/images/flags/' + testimony.flag + '.png')" :alt="testimony.country + 'flag'" class="flag-image">
				</div>
			</div>
		</div>
	</div>

	<!-- <ion-card-content>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet. 
			</p>
			<ion-grid>
				<ion-row>
				<ion-col col-3>
				<div class="rounded-full overflow-hidden w-14 h-14 flex items-center justify-center">
					<img src="@app/assets/images/testimonials/eunice.jpeg" alt="testimonial image" class="w-full w-min-full h-min-full">
				</div>
				</ion-col>
				<ion-col col-9>
				<div class="">
					<ion-card-title class="testimonial-name">Eunice Apo</ion-card-title>
				</div>
				</ion-col>
				</ion-row>
			</ion-grid>
		</ion-card-content>
		<ion-card-header>
			<div class="flex gap-2 items-center">
				<div class="rounded-full overflow-hidden w-14 h-14 flex items-center justify-center">
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
	</ion-card> -->
</template>

<script lang="ts">
// import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon, IonItem, IonLabel } from '@ionic/vue'
// import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid} from '@ionic/vue'
// import { pin, walk, warning, wifi, wine } from 'ionicons/icons'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'TestimonialCard',
	props: {
		testimony: {
			type: Object,
			required: true
		},
		secondCard: {
			type: Boolean,
			default: false,
			required: false
		}

	}
	// components: { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonGrid },
	// setup() {
	// 	return { warning }
	// }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
.card-arrow {
	height: 0;
	width: 0;
	border-width: 10px;
	border-bottom-color: transparent;
	border-left-color: transparent;
}
.testimony {
	font-family: 'DM Sans', sans-serif;
}
</style>