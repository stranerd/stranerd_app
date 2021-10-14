<template>
	<div class="w-full">
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-dark_gray">
				Challenges
			</span>


			<div class="text-primary normalText flex items-center font-bold ">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>	
			</div>
		</div>

		<div class="flex md:gap-6 gap-3 mt-2">
			<swiper
				:direction="'horizontal'" :slidesPerView="3" :spaceBetween="16" :freeMode="true" class="overflow-x-auto"
			>
				<swiper-slide
					v-for="(card,index) in 10"
					:key="index"
					class="flex !w-[14rem]">
					<ChallengesCard :style="0 === index ? 'bg-butter_yellow' : 'bg-light_gray'"/>
				</swiper-slide>
				
			</swiper>
		</div>
	</div> 
</template>


<script lang="ts">
import {  IonIcon } from '@ionic/vue'
import { chevronForwardOutline, chevronBackOutline, ellipse } from 'ionicons/icons'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import ChallengesCard from './ChallengesCard.vue'


export default  {
	name: 'Home',
	components: {  IonIcon,   Swiper, SwiperSlide, ChallengesCard },
	setup(){
		return{
			chevronForwardOutline, chevronBackOutline, ellipse
		}
	}
}
</script>

<style>

</style>