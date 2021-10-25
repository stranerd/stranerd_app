<template>
	<div class="w-full flex justify-between mt-10">
		<span class="heading font-bold text-dark_gray">
			Recent transactions
		</span>

		<slider-controller class="hidden lg:flex"/>

		<div class="text-primary normalText flex items-center font-bold ">
			<span>view all</span>
			<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>	
		</div>
	</div>

	<div class="flex md:gap-6 gap-3 mt-3 mb-8 lg:hidden">
		<swiper
			:direction="'horizontal'" :spaceBetween="30" :freeMode="true" class="overflow-x-auto"
		>
			<swiper-slide
				v-for="(card,index) in 10"
				:key="index"

				class="flex md:!w-[17rem] !w-[12.5rem] !mr-4">
				<TransactionCard :colorClass="0 === index ? 'bg-light_orange' : 'bg-light_gray'"/>
			</swiper-slide>
				
		</swiper>
	</div>

	<div class="lg:flex  w-full  md:gap-6 gap-3 mt-2 hidden">
		<swiper
			class="flex flex-row w-full items-center"
			:direction="'horizontal'" :slidesPerView="3" 
		>
			<swiper-slide
				class="!w-1/3 !pr-3"
				v-for="(card,index) in 10"
				:key="index">
				<TransactionCard :colorClass="0 === index ? 'bg-light_orange' : 'bg-light_gray'"/>
			</swiper-slide>
				
		</swiper>
	</div>
	
</template>


<script lang="ts">
import {  IonIcon } from '@ionic/vue'
import { chevronForwardOutline, chevronBackOutline, ellipse } from 'ionicons/icons'
import SliderController from '@/application/components/core/nav/sliderController.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import TransactionCard from '../wallet/TransactionCard.vue'

export default  {
	name: 'Home',
	components: {  IonIcon, SliderController, Swiper, SwiperSlide, TransactionCard },
	setup(){
		return{	chevronForwardOutline, chevronBackOutline, ellipse}
	}
}
</script>

<style>

</style>