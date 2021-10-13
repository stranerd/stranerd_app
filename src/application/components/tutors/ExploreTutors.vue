<template>
	<div class="grid grid-col-6 px-3  text-xs md:text-sm  col-span-12">
		<div class="col-span-6 grid grid-cols-6 py-2 mt-2 md:mt-3">

			<div class="col-span-6 grid grid-cols-12 md:px-2 place-items-center">
				<div class="py-1 px-2 px-md text-sm col-span-12 md:col-start-4 md:col-end-10 md:mb-3 min-w-[18.5rem]   bg-light_gray rounded-xl md:rounded-md flex flex- mt-2">
					<ion-select value="notifications" class="w-full normalText  placeholder-[#8B9EB1] font-bold" placeholder="Filter by subject" interface="action-sheet">
						<ion-select-option value="maths" >Mathematics</ion-select-option>
						<ion-select-option value="physics" >Physics</ion-select-option>
						<ion-select-option value="bio" >Biology</ion-select-option>
						<ion-select-option value="geo"  >Geography</ion-select-option>
						<ion-select-option value="business" >Business</ion-select-option>
						<ion-select-option value="civil" >Civil Right</ion-select-option>
					</ion-select>
				</div>
				
				<div class="py-1 pr-3 mx-20 mt-4  text-sm col-span-12 md:col-start-4 md:col-end-10 md:mb-3  min-w-[10.125rem]  bg-light_gray rounded-xl md:rounded-md flex flex-row">
					<ion-select value="notifications" class="w-full normalText  placeholder-[#8B9EB1] font-bold" placeholder="Level" interface="action-sheet">
						<ion-select-option value="100" >100</ion-select-option>
						<ion-select-option value="200" >200</ion-select-option>
						<ion-select-option value="300" >300</ion-select-option>
						<ion-select-option value="400"  >400</ion-select-option>
						<ion-select-option value="500" >500</ion-select-option>
					</ion-select>
				</div>

	
			</div>

			<div class="mt-5 md:mt-8  col-span-6 flex flex-row flex-wrap justify-center">
				<tutor-card class="bg-light_gray flex md:!w-[260px] !w-[150px]" :showButton="true" v-for="n in 10" :key="n"/>
			</div>
		</div>

	</div>

</template>
<script lang="ts">
import { IonSelect, IonSelectOption, } from '@ionic/vue'
import {  defineComponent } from 'vue'

import 'swiper/swiper-bundle.min.css'
import TutorCard from './TutorCard.vue'
export default defineComponent({

	components: { IonSelect, IonSelectOption,   TutorCard }
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
