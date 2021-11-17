<template>
	<div class="md:px-8 px-4 py-10 bg-light_gray">
		<div class="container mx-auto">
			<Swiper
				:modules="modules"
				:slides-per-view="3"
				:dynamicBullets="true"
				:dynamicMainBullets="5"
				:space-between="20"
				class="flex flex-row w-full gap-5 items-stretch"
				:freeMode="true"
				:pagination="{ clickable: true }"
			>
				<SwiperSlide v-for="(testimony, i) in testimonies" :key="i" class="!min-w-[18rem] !h-auto mb-16">
					<TestimonialCard :testimony="testimony" :secondCard="i === 1"></TestimonialCard>
				</SwiperSlide>
			</Swiper>
		</div>
	</div>
</template>


<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Pagination, A11y } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import TestimonialCard from '@app/components/landing/TestimonialCard.vue'
export default {
	name: '',
	components: {
		TestimonialCard,
		Swiper, 
		SwiperSlide
	},
	setup() {
		return {
			modules: [Pagination, A11y],
		}
	},
	data() {
		return {
			testimonies: [
				{
					name: 'Eunice Apo',
					image:'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'nigeria',
					flag: 'nigeria'
				},
				{
					name: 'Eunice Apo',
					image:'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'usa',
					flag: 'usa'
				},
				{
					name: 'Eunice Apo',
					image:'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'nigeria',
					flag: 'nigeria'
				},
				{
					name: 'Eunice Apo',
					image:'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'usa',
					flag: 'usa'
				},
				{
					name: 'Eunice Apo',
					image:'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'nigeria',
					flag: 'nigeria'
				},
				{
					name: 'Eunice Apo',
					image:'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'usa',
					flag: 'usa'
				},
				{
					name: 'Eunice Apo',
					image:'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'nigeria',
					flag: 'nigeria'
				}
			]
		}
	},
}
</script>


<style>
.swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      color: #8B9EB1;
      opacity: 1;
      background: #8B9EB1;
    }

    .swiper-pagination-bullet-active {
      color: #fff;
	  background: #fff;
	  border: 2px solid #546dd2;
    }
</style>