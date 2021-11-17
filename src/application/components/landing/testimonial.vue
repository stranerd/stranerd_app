<template>
	<div class="md:px-8 px-4 py-8 bg-light_gray">
		<div class="container mx-auto">
			<Swiper
				:modules="modules"
				:slides-per-view="3"
				:space-between="20"
				class="flex flex-row w-full gap-5 items-stretch"
				:freeMode="true"
				bulletClass="pagination-dot"
				:pagination="{ clickable: true }"
			>
				<SwiperSlide v-for="(testimony, i) in testimonies" :key="i" class="!min-w-[18rem] !h-auto pb-18">
					<TestimonialCard :testimony="testimony" :secondCard="i === 1"></TestimonialCard>
				</SwiperSlide>
			</Swiper>
			<div class="my-8 controls flex justify-center items-center gap-2">
				<span class="cursor-pointer h-2.5 w-2.5 rounded-full inline-block bg-white border-2 border-primary"></span>
				<span class="cursor-pointer h-2.5 w-2.5 rounded-full inline-block bg-icon_inactive"></span>
				<span class="cursor-pointer h-2.5 w-2.5 rounded-full inline-block bg-icon_inactive"></span>
				<span class="cursor-pointer h-2.5 w-2.5 rounded-full inline-block bg-icon_inactive"></span>
				<span class="cursor-pointer h-2.5 w-2.5 rounded-full inline-block bg-icon_inactive"></span>
			</div>
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
				}
			]
		}
	},
}
</script>


<style>
.pagination-dot {
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      font-size: 12px;
      color: #000;
      opacity: 1;
      background: rgba(0, 0, 0, 1);
    }

    .swiper-pagination-bullet-active {
      color: #fff;
      background: #fff;
    }
</style>