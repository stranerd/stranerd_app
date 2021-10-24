<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="layout-page">
				<div class="layout-body">
					<!-- page contents goes here -->
					<div class="col-span-12  md:col-start-3 md:col-end-11 px-3 ">
						<div class="bg-light_gray rounded-md flex flex-row items-center">
							<button @click="handleSliding('0')" :class="selectedTab == 'explore' ? 'activeSlideTab w-1/2' : 'inactiveSlideTab w-1/2'">
								Explore tutors
							</button>
							<button @click="handleSliding('1')"  :class="selectedTab == 'find' ? 'activeSlideTab w-1/2' : 'inactiveSlideTab w-1/2'">
								Find a tutor
							</button>
						</div>
					</div>

					<div class="col-span-12 mb-16">
						<swiper
							@swiper="onSwiper"
							@slideChange="onSlideChange"
						>
							<swiper-slide >
								<ExploreTutors/>
							</swiper-slide>
							<swiper-slide >
								<FindTutors/>			
							</swiper-slide>
						</swiper>
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
import { defineAsyncComponent, ref, onMounted } from 'vue'

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useStore } from '@/application/store'

const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideProfileNav.vue'))
import ExploreTutors from '@/application/components/tutors/ExploreTutors.vue'
import FindTutors from '@/application/components/tutors/FindTutors.vue'

export default  {
	name: 'tutors',
	layout: 'Dashboard',
	components: { IonPage, IonContent, SideProfileNav , ExploreTutors, Swiper, SwiperSlide, FindTutors, },

	setup() {

		 const selectedTab = ref('explore')
		 
		 const swiperData = ref({
			 slideTo: Function,
			 update: Function
		 })

		 const onSwiper = (swiper: any) => {

			swiperData.value = swiper
		}

		const onSlideChange = () => {
			const ionPage = document.querySelector('ion-content')
			if (selectedTab.value == 'explore') {
				selectedTab.value = 'find'
			} else {
				selectedTab.value = 'explore'
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