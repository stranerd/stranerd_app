<template>
	<div class="w-full lg:mt-0 mt-1">
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-dark_gray">
				Featured tutors
			</span>

			<slider-controller class="hidden lg:flex" />

			<div class="text-primary normalText flex items-center font-bold ">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</div>
		</div>


		<div class=" md:gap-6 gap-3 mt-2 lg:hidden">
			<swiper
				:direction="'horizontal'" :freeMode="true" class="overflow-x-auto"
			>
				<swiper-slide
					v-for="(tutor,index) in tutors"
					:key="index"
					class="flex md:!min-w-[200px] !w-[190px] mr-3">
					<tutor-card :class="0 === index ? 'bg-light_gray flex' : 'bg-light_gray flex'" :showButton="false"
						:tutor="tutor" />
				</swiper-slide>

			</swiper>
		</div>

		<div class="lg:flex  w-full  md:gap-6 gap-3 mt-2 hidden">
			<swiper
				:direction="'horizontal'"
				:slidesPerView="4" class="flex flex-row w-full items-center"
			>
				<swiper-slide
					v-for="(tutor,index) in tutors"
					:key="index"
					class="!w-1/3 !pr-3">
					<tutor-card :class="0 === index ? 'bg-light_gray flex' : 'bg-light_gray flex'" :showButton="false"
						:tutor="tutor" />
				</swiper-slide>

			</swiper>
		</div>

	</div>
</template>

<script lang="ts">
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import SliderController from '@app/components/core/nav/sliderController.vue'
import TutorCard from '@app/components/users/tutors/TutorCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import { useTutorsList } from '@app/composable/users/roles/tutors'

export default {
	name: 'Home',
	components: { IonIcon, SliderController, TutorCard, Swiper, SwiperSlide },
	setup () {

		const { tutors } = useTutorsList()
		return {
			chevronForwardOutline, chevronBackOutline, ellipse, tutors
		}
	}
}
</script>

<style>

</style>
