<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Questions</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true" id="container_content">
			<div class="px-3 pt-2 sticky top-0 bg-white z-30">
				<div class="flex flex-row items-center justify-center col-span-6">
					<button @click="slideToPrev" :class="selectedTab == 'ask' ? 'askBtn customShadow activebtn ion-activatable' : ' askBtn customShadow inactivebtn ion-activatable'">
						Ask
						<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
					</button>
					<button @click="slideToNext" :class="selectedTab == 'answer' ? ' answerBtn customShadow activebtn ion-activatable' : ' answerBtn customShadow inactivebtn ion-activatable'">
						Answer
						<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
					</button>
				</div>
			</div>
			<swiper
				:slides-per-view="1"
				@swiper="onSwiper"
				:nextButton="'answerBtn'"
				:prevButton="'askBtn'"
				@slideChange="onSlideChange"
			>
				<swiper-slide>
					<ask-question></ask-question>
				</swiper-slide>
				<swiper-slide>
					<answer-questions></answer-questions>
				</swiper-slide>
			</swiper>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRippleEffect } from '@ionic/vue'
import AnswerQuestions from '@/application/components/questions/answers.vue'
import AskQuestion from '@/application/components/questions/ask.vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import { ref } from '@vue/reactivity'


export default  {
	name: 'Questions',
	components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonRippleEffect, AnswerQuestions, AskQuestion, Swiper, SwiperSlide },
	setup() {

		const selectedTab = ref('ask')
		let swiperComp: any = undefined


		const onSwiper = (swiper: any) => {
			swiperComp = swiper
		}
		
		

		const slideToNext = () => {

			swiperComp.slideNext()

			const container = document.querySelector('ion-content')

			container?.scrollToTop(500)
		}

		const slideToPrev = () => {
			
			swiperComp.slidePrev()

			const container = document.querySelector('ion-content')

			container?.scrollToTop(500)

		}

		const onSlideChange = () => {
			 if (selectedTab.value == 'ask') {

				 selectedTab.value = 'answer'
				

			 } else {
				 selectedTab.value = 'ask'
				
			 }
			const container = document.querySelector('ion-content')
			container?.scrollToTop(500)
		}
		return {
			onSwiper,
			onSlideChange,
			selectedTab,
			slideToNext,
			slideToPrev
		}
	},
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}

.customShadow {
	 box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
}

.inactivebtn {
	@apply w-1/2 py-2 px-2  relative font-medium text-center text-sm text-primary rounded-lg  bg-white
}

.activebtn {
	@apply w-1/2 py-2 px-2 font-medium border  relative border-gray-400 text-center text-sm text-white rounded-lg bg-primary
}


</style>