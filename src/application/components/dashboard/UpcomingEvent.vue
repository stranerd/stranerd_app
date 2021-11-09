<template>
	<div>
		<div class="w-full flex justify-between mt-10">
			<span class="heading font-bold text-dark_gray">
				Upcoming events
			</span>

			<slider-controller class="hidden lg:flex" />

			<div class="text-primary normalText flex items-center font-bold ">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</div>
		</div>

		<div class="flex md:gap-6 gap-3 mt-3 lg:hidden">
			<swiper
				:direction="'horizontal'" :freeMode="true" class="overflow-x-auto"
			>
				<swiper-slide
					v-for="(card,index) in 10"
					:key="index"

					class="flex md:!w-[17rem] !w-[12.5rem] mr-3">
					<ScheduleCard :colorClass="0 === index ? 'bg-light_green' : 'bg-light_gray'" />
				</swiper-slide>

			</swiper>
		</div>

		<div class="lg:flex  w-full  md:gap-6 gap-3 mt-2 hidden">
			<swiper
				:direction="'horizontal'"
				:slidesPerView="3" class="flex flex-row w-full items-center"
			>
				<swiper-slide
					v-for="(card,index) in 10"
					:key="index"
					class="!w-1/3 !pr-3">
					<ScheduleCard :colorClass="0 === index ? 'bg-light_green' : 'bg-light_gray'" />
				</swiper-slide>

			</swiper>
		</div>
	</div>

</template>


<script lang="ts">
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import SliderController from '@app/components/core/nav/sliderController.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import ScheduleCard from '../users/schedule/ScheduleCard.vue'

export default {
	name: 'Home',
	components: { IonIcon, SliderController, Swiper, SwiperSlide, ScheduleCard },
	setup () {
		return { chevronForwardOutline, chevronBackOutline, ellipse }
	}
}
</script>

<style>

</style>
