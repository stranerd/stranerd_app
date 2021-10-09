<template>
	<div class="grid grid-col-6 px-3  text-xs md:text-sm  col-span-12">
		
		<div class="col-span-6 grid grid-cols-6 py-2 mt-2 md:mt-3">

			<div class="col-span-6 grid grid-cols-6 md:px-2 ">
				<div class="py-1 px-2 px-md text-sm col-span-6 md:col-span-3 md:mt-1 md:order-last bg-light_gray rounded-xl md:rounded-md flex flex-row">
					<ion-select value="notifications" class="w-full text-xs md:text-sm  placeholder-[#8B9EB1] font-bold" placeholder="Filter by subject" interface="action-sheet">
						<ion-select-option value="maths" class="text-sm">Mathematics</ion-select-option>
						<ion-select-option value="physics" class="text-sm">Physics</ion-select-option>
						<ion-select-option value="bio" class="text-sm">Biology</ion-select-option>
						<ion-select-option value="geo" class="text-sm" >Geography</ion-select-option>
						<ion-select-option value="business" class="text-sm">Business</ion-select-option>
						<ion-select-option value="civil" class="text-sm">Civil Right</ion-select-option>
					</ion-select>
				</div>

				<div class="mt-2 col-span-6 md:col-span-3 flex flex-row-reverse md:order-first md:mt-1 justify-center items-center md:justify-end">
					<div class="flex flex-row items-center mr-2">
						<ion-icon :icon="ellipse" class="text-lg mr-1 text-primary"></ion-icon>
						<span class="font-bold text-icon_inactive">Answered </span>
					</div>
					<div class="flex flex-row items-center mr-2">
						<ion-icon :icon="ellipseOutline" class="text-lg mr-1 text-primary"></ion-icon>
						<span class="font-bold text-icon_inactive">Unanswered </span>
					</div>
					<span class="font-bold text-icon_inactive mr-3">Sort by: </span>
				
				</div>
			</div>

			<div class="mt-5 md:mt-6  col-span-6 flex flex-row flex-wrap justify-center">
				<tutor-card class="bg-light_gray flex md:!w-[246px] !w-[143px]" :showButton="true" v-for="n in 10" :key="n"/>
			</div>
		</div>
				
	</div>

</template>
<script lang="ts">
import { IonSelect, IonSelectOption,IonIcon } from '@ionic/vue'
import { defineAsyncComponent, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import { ellipse, ellipseOutline } from 'ionicons/icons'
// Import Swiper Vue.js components

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import TutorCard from './TutorCard.vue'


export default defineComponent({
	setup() {

		const router = useRouter()


	
		return {
			ellipseOutline,
			ellipse
		}
	},
	components: { IonSelect, IonSelectOption, IonIcon,  TutorCard }
})
</script>
<style scoped>
.customShadow {
	 box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
}

ion-select {
 
  /* Set a different placeholder color */
  --placeholder-color: #8B9EB1;

  /* Set full opacity on the placeholder */
  --placeholder-opacity: 1;
}

</style>
