<template>
	<div class="w-full lg:mt-0 mt-10">
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-dark_gray">
				Featured tutors
			</span>

			<slider-controller class="hidden lg:flex"/>

			<div class="text-primary normalText flex items-center font-bold ">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>	
			</div>
		</div>

	
		<div class=" md:gap-6 gap-3 mt-2 lg:hidden">
			<swiper
				:direction="'horizontal'"  :freeMode="true" class="overflow-x-auto"
			>
				<swiper-slide
					v-for="(tutor,index) in tutors"
					:key="index"
					class="flex md:!min-w-[200px] !w-[190px] mr-3">
					<tutor-card  :class="0 === index ? 'bg-light_gray flex' : 'bg-light_gray flex'" :tutor="tutor" :showButton="false" />
				</swiper-slide>
				
			</swiper>
		</div>

	<div class="lg:flex  w-full  md:gap-6 gap-3 mt-2 hidden">
			<swiper
				class="flex flex-row w-full items-center"
				:direction="'horizontal'" :slidesPerView="4" 
			>
				<swiper-slide
					class="!w-1/4 !pr-3"
					v-for="(tutor,index) in tutors"
					:key="index">
					<tutor-card  :class="0 === index ? 'bg-light_gray flex' : 'bg-light_gray flex'" :tutor="tutor" :showButton="false" />
				</swiper-slide>
				
			</swiper>
		</div>

	</div>
</template>


<script lang="ts">
import {  IonIcon } from '@ionic/vue'
import { chevronForwardOutline, chevronBackOutline, ellipse } from 'ionicons/icons'
import SliderController from '@/application/components/core/nav/sliderController.vue'
import TutorCard from '@/application/components/tutors/TutorCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import { useTutorsList } from '@/application/composable/users/roles/tutors'


export default  {
	name: 'Home',
	components: {  IonIcon, SliderController, TutorCard, Swiper, SwiperSlide },
	setup(){

		const { tutors } = useTutorsList()
		return{
			chevronForwardOutline, chevronBackOutline, ellipse, tutors
		}
	}
}
</script>

<style>

</style>