<template>
	<div class="grid grid-col-6 px-3  text-xs md:text-sm  col-span-12">
		
		<div class="col-span-6 grid grid-cols-6 py-2 mt-2 md:mt-3">

			<div class="col-span-6 grid grid-cols-12 md:px-2 ">
				<div class="py-1 px-2 px-md text-sm col-span-12 md:col-start-4 md:col-end-10 md:mb-3   bg-light_gray rounded-xl md:rounded-md flex flex-row">
					<ion-select value="notifications" class="w-full text-xs md:text-sm  placeholder-[#8B9EB1] font-bold" placeholder="Filter by subject" interface="action-sheet">
						<ion-select-option value="maths" >Mathematics</ion-select-option>
						<ion-select-option value="physics" >Physics</ion-select-option>
						<ion-select-option value="bio" >Biology</ion-select-option>
						<ion-select-option value="geo"  >Geography</ion-select-option>
						<ion-select-option value="business" >Business</ion-select-option>
						<ion-select-option value="civil" >Civil Right</ion-select-option>
					</ion-select>
				</div>

				<div class="mt-2 col-span-12  md:col-start-4 md:col-end-10 flex flex-row-reverse  justify-center items-center ">
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

			<div class="mt-5 md:mt-6  col-span-6 flex flex-row flex-wrap ">
				
				<div v-for="(question,index) in questions"
					:key="index"
					:class="0 === index ? 'w-full md:px-2 mb-3' :  'md:w-1/2 lg:w-full w-full md:px-2 md:py-3 mb-4 md:mb-0'">
					<question :colorClass="0 === index ? 'bg-butter_yellow h-[230px] md:h-[220px]' : 'bg-light_gray h-[230px] md:h-[220px]'" :isFeatured="0 === index ? true : false" :question="question"/>
				</div>

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
import { useQuestionList } from '@/application/composable/questions/questions'

const Question = defineAsyncComponent(() => import('@/application/components/questions/question.vue'))

export default defineComponent({
	setup() {

		const { questions } = useQuestionList()
		return {
			ellipseOutline,
			ellipse,
			questions
		}
	},
	components: { IonSelect, IonSelectOption, IonIcon, Question }
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
