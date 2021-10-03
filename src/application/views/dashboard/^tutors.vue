<template>
	<ion-page>
		<ion-header mode="ios">
			<ion-toolbar>
				<ion-title class="font-bold text-sm text-center text-dark">Tutors</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true" id="container_content">
			<div class="px-3 mt-[27px] pb-1 sticky top-0 bg-white z-30">
				<div class="flex flex-row items-center justify-center col-span-6 tab">
					<button @click="slideToPrev" :class="selectedTab == 'ask' ? 'askBtn  activebtn ion-activatable' : ' askBtn  inactivebtn ion-activatable'">
						Explore Tutors
						<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
					</button>
					<button @click="slideToNext" :class="selectedTab == 'answer' ? ' answerBtn  activebtn ion-activatable' : ' answerBtn  inactivebtn ion-activatable'">
						Find a Tutor
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
					<explore-tutors/>
				</swiper-slide>
				<swiper-slide>
					<find-a-tutor/>
				</swiper-slide>
			</swiper>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRippleEffect } from '@ionic/vue'
import ExploreTutors from '@/application/components/tutors/ExploreTutors.vue'
import FindATutor from '@/application/components/tutors/FindATutor.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import { ref } from '@vue/reactivity'



export default  {
	name: 'Questions',
	components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonRippleEffect, Swiper, SwiperSlide, ExploreTutors, FindATutor },
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
	--border-width: 0rem !important;
	--min-height: 3.0625rem !important;
	box-shadow: 0px 2px 10px rgba(19, 39, 64, 0.097);
}

.tab{
	filter: drop-shadow(-2px 4px 23px rgba(169, 185, 235, 0.5));
	background: #F8F8FF;
box-shadow: 0px 2px 10px rgba(19, 39, 64, 0.097);
border-radius: 10px;
@apply w-full  text-xs font-medium;

}



.inactivebtn {
	@apply w-1/2  relative  text-center text-xs text-primary rounded-lg   ;
}

.activebtn {
	box-shadow: 0px 2px 10px rgba(19, 39, 64, 0.097);
	border-radius: 10px;
	@apply w-1/2 py-3 px-2  relative border-gray-400 text-center text-xs text-white bg-primary
}


</style>