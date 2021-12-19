<template>
	<div class="md:px-8 px-4 py-10 bg-light_gray">
		<div class="container mx-auto">
			<Swiper
				:breakpoints="swiperOptions.breakpoints"
				:dynamic-bullets="true"
				:dynamic-main-bullets="1"
				:free-mode="true"
				:modules="modules"
				:pagination="{ clickable: true }"
				:space-between="10"
				class="flex flex-row w-full gap-5 md:gap-10 lg:gap-24 justify-between items-stretch"
			>
				<SwiperSlide v-for="(testimony, i) in testimonies" :key="i"
					class="!min-w-[13rem] !max-w-[14rem] lg:!min-w-[18rem] lg:!max-w-[38rem] !h-auto mb-16">
					<TestimonialCard :secondCard="i === 1" :testimony="testimony"></TestimonialCard>
				</SwiperSlide>
			</Swiper>
		</div>
	</div>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Pagination } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import TestimonialCard from '@app/components/landing/TestimonialCard.vue'

export default {
	name: '',
	components: {
		TestimonialCard,
		Swiper,
		SwiperSlide
	},
	setup () {
		return {
			modules: [Pagination]
		}
	},
	data () {
		return {
			swiperOptions: {
				breakpoints: {
					0: {
						slidesPerView: 1.5,
						spaceBetween: 10
					},
					567: {
						slidesPerView: 3,
						spaceBetween: 30
					}
				}
			},
			testimonies: [
				{
					name: 'Eunice Apo',
					image: 'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'nigeria',
					flag: 'nigeria'
				},
				{
					name: 'Eunice Apo',
					image: 'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'usa',
					flag: 'usa'
				},
				{
					name: 'Eunice Apo',
					image: 'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'nigeria',
					flag: 'nigeria'
				},
				{
					name: 'Eunice Apo',
					image: 'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'usa',
					flag: 'usa'
				},
				{
					name: 'Eunice Apo',
					image: 'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'nigeria',
					flag: 'nigeria'
				},
				{
					name: 'Eunice Apo',
					image: 'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'usa',
					flag: 'usa'
				},
				{
					name: 'Eunice Apo',
					image: 'eunice',
					testimonies: [
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae maecenas sed sagittis amet.'
					],
					country: 'nigeria',
					flag: 'nigeria'
				}
			]
		}
	}
}
</script>

<style scoped>
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
