<template>
	<div class="grid grid-col-6 px-3 ">
		<div class="col-span-6 pt-2 pb-1 mt-2 text-center leading-none">
			<span class="text-gray-800 text-xs" >Help other students with answers to their questions and earn coins while also increasing your badges</span>
		</div>
		<div class="col-span-6 py-2 ">
			<div v-if="showSearch" class="py-1 px-1 border-2 flex-row items-center flex border-gray-100 rounded-3xl bg-gray-50 text-gray-400 w-full">
				<i class="las la-search" style="font-size:20px;padding-left:4px;padding-right:6px;"></i> 
				<input placeholder="search" class=" bg-gray-50 text-xs flex-grow focus:outline-none"/>
				<i @click="showSearch = false" class="las la-times" style="font-size:20px;padding-left:4px;padding-right:6px;"></i> 
			</div>
			<div v-else class="py-1 flex-row-reverse items-center flex w-full">
				<div class="flex flex-row items-center text-gray-400 ml-2">
					<i class="las la-dot-circle" style="font-size:18px;"></i>
					<span class="font-semibold text-xs text-primary ml-1">Answered</span>
				</div>
				<div class="flex flex-row items-center text-primary">
					<i class="las la-dot-circle" style="font-size:18px;"></i>
					<span class="font-semibold text-xs text-primary ml-1">Unanswered</span>
				</div>
				<div @click="showSearch = true" class="flex flex-row items-center text-gray-400 flex-grow">
					<div class="w-[29px] h-[29px] bg-gray-50 rounded-full flex justify-center items-center">
						<i class="las la-search" style="font-size:20px;"></i>
					</div>
				</div>
			</div>
		</div>
				
	</div>
	<div class="col-span-6 pt-1  flex flex-col px-3">
		<h3 class="text-sm font-semibold text-sub">Categories</h3>
		<swiper
			:direction="'horizontal'" :slidesPerView="'auto'" :freeMode="true" class="overflow-x-auto mt-2 whitespace-nowrap px-3"
		>
			<swiper-slide>
				<span class="mr-2 bg-primary text-white text-xs py-1 px-3 font-medium rounded-2xl">
					Science
				</span>
				<span class="mr-2 bg-primary text-white text-xs py-1 px-3 font-medium rounded-2xl">
					Art
				</span>
				<span class="mr-2 bg-primary text-white text-xs py-1 px-3 font-medium rounded-2xl">
					Maths
				</span>
				<span class="mr-2 bg-primary text-white text-xs py-1 px-3 font-medium rounded-2xl">
					Music
				</span>
				<span class="mr-2 bg-primary text-white text-xs py-1 px-3 font-medium rounded-2xl">
					Business
				</span>
				<span class="mr-2 bg-primary text-white text-xs py-1 px-3 font-medium rounded-2xl">
					Maths
				</span>
				<span class="mr-2 bg-primary text-white text-xs py-1 px-3 font-medium rounded-2xl">
					Music
				</span>
				<span class="mr-2 bg-primary text-white text-xs py-1 px-3 font-medium rounded-2xl">
					Business
				</span>
			</swiper-slide>
		</swiper>
	</div>

	<div class="col-span-6 pt-2 flex flex-col px-3 mt-1">
		<div class="flex flex-row items-center">
			<h3 class="text-sm font-semibold text-sub mr-2">Featured Question</h3>
			<i class="las la-star" style="font-size:20px;color:#FFDA20;"></i>
		</div>
	</div>

	<div class="col-span-6 py-1 flex flex-col mt-1">
		<div class="flex flex-row border-b-1 pt-2 pb-4 px-3 mb-3 w-full border-b-2 border-gray-200" @click="showAnswers">
			<div class="bg-white py-2 px-3 ion-activatable relative rounded-lg customShadow w-full flex flex-col">
				<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				<div class="flex flex-row items-center w-full py-2">
					<img src="assets/raymond.jpg" class="h-8 w-8 rounded-full mr-2"/>
					<span class="text-xs text-sub ">Timmy Neutron</span>
					<div class="flex-grow flex flex-row-reverse items-center">
						<button class="py-1 px-3 ml-3 bg-primary rounded-2xl text-white text-xs ">
							Answer
						</button>
						<img class=" h-6 ml-1" src="assets/bronze.svg"/>
						<span class="ml-1 text-sm text-sub">
							+20
						</span>
					</div>
				</div>
				<div class="flex flex-col w-full py-1">
					<h2 class="text-xs uppercase text-primaryDark font-semibold">Mathematics</h2>
					<p class="pb-1 pt-2 text-xs text-dark">
						From the top of a building with a height of 16
						meters, a ball is thrown at angle of 30 degre...
					</p>
					<div class="flex flex-row flex-wrap items-center pt-3">
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							motion
						</span>
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							projectile-motion
						</span>
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							projectile
						</span>
					</div>
					<div class="flex flex-row items-center pt-4 pb-1">
						<span class="text-xs text-sub">
							Posted 30 mins ago
						</span>
						<div class="flex-grow flex flex-row-reverse items-center">
							<span class="text-xs text-dark ml-2">5 ans</span>
							<img class=" h-4 " src="assets/answers.svg"/>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-row border-b-1 pt-2 pb-4 px-3 mb-3 w-full ">
			<div class="bg-white py-2 px-3 ion-activatable relative rounded-lg customShadow w-full flex flex-col"  @click="showAnswers">
				<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				<div class="flex flex-row items-center w-full py-2">
					<img src="assets/raymond.jpg" class="h-8 w-8 rounded-full mr-2"/>
					<span class="text-xs text-sub ">Timmy Neutron</span>
					<div class="flex-grow flex flex-row-reverse items-center">
						<button class="py-1 px-3 ml-3 bg-primary rounded-2xl text-white text-xs ">
							Answer
						</button>
						<img class=" h-6 ml-1" src="assets/bronze.svg"/>
						<span class="ml-1 text-sm text-sub">
							+20
						</span>
					</div>
				</div>
				<div class="flex flex-col w-full py-1">
					<h2 class="text-xs uppercase text-primaryDark font-semibold">Mathematics</h2>
					<p class="pb-1 pt-2 text-xs text-dark">
						From the top of a building with a height of 16
						meters, a ball is thrown at angle of 30 degre...
					</p>
					<div class="flex flex-row flex-wrap items-center pt-3">
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							motion
						</span>
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							projectile-motion
						</span>
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							projectile
						</span>
					</div>
					<div class="flex flex-row items-center pt-4 pb-1">
						<span class="text-xs text-sub">
							Posted 30 mins ago
						</span>
						<div class="flex-grow flex flex-row-reverse items-center">
							<span class="text-xs text-dark ml-2">5 ans</span>
							<img class=" h-4 " src="assets/answers.svg"/>
						</div>
					</div>
				</div>
			</div>
		</div>


		<div class="flex flex-row border-b-1 pt-2 pb-4 px-3 mb-3 w-full ">
			<div class="bg-white py-2 px-3 ion-activatable relative rounded-lg customShadow w-full flex flex-col "  @click="showAnswers">
				<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				<div class="flex flex-row items-center w-full py-2">
					<img src="assets/raymond.jpg" class="h-8 w-8 rounded-full mr-2"/>
					<span class="text-xs text-sub ">Timmy Neutron</span>
					<div class="flex-grow flex flex-row-reverse items-center">
						<button class="py-1 px-3 ml-3 bg-primary rounded-2xl text-white text-xs ">
							Answer
						</button>
						<img class=" h-6 ml-1" src="assets/bronze.svg"/>
						<span class="ml-1 text-sm text-sub">
							+20
						</span>
					</div>
				</div>
				<div class="flex flex-col w-full py-1">
					<h2 class="text-xs uppercase text-primaryDark font-semibold">Mathematics</h2>
					<p class="pb-1 pt-2 text-xs text-dark">
						From the top of a building with a height of 16
						meters, a ball is thrown at angle of 30 degre...
					</p>
					<div class="flex flex-row flex-wrap items-center pt-3">
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							motion
						</span>
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							projectile-motion
						</span>
						<span class="mr-2 bg-tags text-sub text-xs py-[3px] px-3 border-[2px] border-gray-100 rounded-2xl">
							projectile
						</span>
					</div>
					<div class="flex flex-row items-center pt-4 pb-1">
						<span class="text-xs text-sub">
							Posted 30 mins ago
						</span>
						<div class="flex-grow flex flex-row-reverse items-center">
							<span class="text-xs text-dark ml-2">5 ans</span>
							<img class=" h-4 " src="assets/answers.svg"/>
						</div>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>
<script lang="ts">
import { IonRippleEffect } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/swiper-bundle.min.css'

export default defineComponent({
	setup() {

		const router = useRouter()

		const showSearch = ref(false)

		const showAnswers = () => {
			router.push({ path: '/question/answers' })
		}
		return {
			showAnswers,
			showSearch
		}
	},
	components: { IonRippleEffect, Swiper, SwiperSlide }
})
</script>
<style scoped>
.customShadow {
	 box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
}
</style>
