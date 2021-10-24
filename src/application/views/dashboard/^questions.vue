<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="layout-page">
				<div class="layout-body">
					<div class="col-span-12  md:col-start-3 md:col-end-11 px-3 ">
						<div class="bg-light_gray rounded-md flex flex-row items-center">
							<button @click="handleSliding('0')" :class="selectedTab == 'all' ? 'activeSlideTab w-1/2' : 'inactiveSlideTab w-1/2'">
								All questions
							</button>
							<button @click="handleSliding('1')"  :class="selectedTab == 'ask' ? 'activeSlideTab w-1/2' : 'inactiveSlideTab w-1/2'">
								Ask your question
							</button>
						</div>
					</div>
					<div class="col-span-12 ">
						<swiper
							@swiper="onSwiper"
							@slideChange="onSlideChange"
						>
							<swiper-slide >
								<all-questions></all-questions>
							</swiper-slide>
							<swiper-slide >
								<ask-questions></ask-questions>				
							</swiper-slide>
						</swiper>
					</div>
					
					<div class="mb-[60px] col-span-12 md:mb-[80px]">
					</div>
				</div>
				<div class="layout-side-right">
					<side-profile-nav></side-profile-nav>
				</div>
			</div>
			
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent } from '@ionic/vue'
import { defineAsyncComponent, ref } from 'vue'
const AllQuestions = defineAsyncComponent(() => import('@/application/components/questions/all.vue'))
const AskQuestions = defineAsyncComponent(() => import('@/application/components/questions/ask.vue'))
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideProfileNav.vue'))


// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import { Swiper, SwiperSlide } from 'swiper/vue'

export default  {
	name: 'questions',
	layout: 'Dashboard',
	components: { IonPage, IonContent, AllQuestions, SideProfileNav, Swiper, SwiperSlide, AskQuestions },
	setup() {

		 const selectedTab = ref('all')
		 
		 const swiperData = ref({
			 slideTo: Function,
			 update: Function
		 })

		 const onSwiper = (swiper: any) => {

			swiperData.value = swiper
		}

		const onSlideChange = () => {
			const ionPage = document.querySelector('ion-content')
			if (selectedTab.value == 'all') {
				selectedTab.value = 'ask'
			} else {
				selectedTab.value = 'all'
			}

			ionPage?.scrollToTop()
		}

	 const handleSliding = (index: string) => {
		 swiperData.value.slideTo(index)

		 swiperData.value.update()

	 }
		return {
			onSwiper,
			swiperData,
			selectedTab,
			onSlideChange,
			handleSliding
		}
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>