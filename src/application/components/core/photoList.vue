<template>

	
	<swiper
		:direction="'horizontal'"  :spaceBetween="16" :freeMode="true" class="overflow-x-auto"
	>
		<swiper-slide
			v-for="(photo, index) in photos" :key="index + 'photo'">
			<div class="rounded-lg border-[1px] border-faded_gray bg-light_gray h-24 w-24 md:h-28 md:w-28" 
				:style="`background:url(${photo.link}); background-size:cover; background-position:center;`">
			</div>
		</swiper-slide>
				
	</swiper>


	<div class="lg:flex gap-3  hidden w-full">
		<swiper
			:direction="'horizontal'" :slidesPerView="5" :spaceBetween="15"
		>
			<swiper-slide
				v-for="(photo, index) in photos" :key="index + 'photo'">
				<div class="rounded-lg border-[1px] border-faded_gray bg-light_gray h-36" 
					:style="`background:url(${photo.link}); background-size:cover; background-position:center;`">
				</div>
			</swiper-slide>
				
		</swiper>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
	components: { Swiper, SwiperSlide }
})
</script>
