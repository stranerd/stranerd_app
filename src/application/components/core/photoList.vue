<template>

	
	<swiper
		class="lg:hidden" 
		@swiper="onSwiper" :params="{ slidesPerView: 3, spaceBetween: 10}"
	>
		<swiper-slide 
			v-for="(photo, index) in photos" :key="index + 'photo'">
			<div class="rounded-lg border-[1px] border-faded_gray bg-light_gray h-24 md:h-28 md:w-28" 
				:style="`background:url(${photo.link}); background-size:cover; background-position:center;`">
			</div>
		</swiper-slide>
				
	</swiper>

	<swiper   class=" hidden w-full lg:block"
		:slidesPerView="5"  :spaceBetween="10"
		@swiper="onSwiper"
	>
		<swiper-slide
			v-for="(photo, index) in photos" :key="index + 'photo'">
			<div class="rounded-lg border-[1px] border-faded_gray bg-light_gray h-36" 
				:style="`background:url(${photo.link}); background-size:cover; background-position:center;`">
			</div>
		</swiper-slide>
				
	</swiper>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance,  ref } from 'vue'
import { Media } from '@/modules/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'

export default defineComponent({
	name: 'Photo list',
	props: {
		photos: {
			type: Object as () => Media[]
		}
	},
	components: { Swiper, SwiperSlide },
	setup(props) {


		 const swiperData = ref({
			 slideTo: Function,
			 update: Function,
		 })
		 
		 const onSwiper = (swiper: any) => {

			swiperData.value = swiper

		}
		return {
			onSwiper,
			swiperData
		}
	}
})
</script>
