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
				:direction="'horizontal'" :spaceBetween="16" :freeMode="true" class="overflow-x-auto"
			>
				<swiper-slide
					v-for="(tutor,index) in tutors"
					:key="index"
					class="flex md:!min-w-[180px] !w-[150px]">
					<tutor-card :style="0 === index ? 'bg-butter_yellow' : 'bg-light_gray'" :tutor="tutor"/>
				</swiper-slide>
				
			</swiper>
		</div>

		<swiper
			:direction="'horizontal'" :slidesPerView="4" :spaceBetween="15" class="mt-3 hidden lg:block"
		>

			<swiper-slide
				v-for="(tutor,index) in tutors"
				:key="index">
				<tutor-card :style="0 === index ? 'bg-butter_yellow' : 'bg-light_gray'" :tutor="tutor"/>
			</swiper-slide>
				
		</swiper>


	</div>
</template>


<script lang="ts">
import {  IonIcon } from '@ionic/vue'
import { chevronForwardOutline, chevronBackOutline, ellipse } from 'ionicons/icons'
import SliderController from '@/application/components/core/nav/sliderController.vue'
import TutorCard from '@/application/components/dashboard/HomeTutorCard.vue'
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