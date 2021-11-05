<template>
	<div
		class="absolute md:py-6 md:px-6  px-3 flex  h-[100%] w-full md:w-[90%] lg:w-[50%] flex-col items-center content-center align-middle ">

		<swiper class="relative h-[80%] top-[10%] w-full"
			@slideChange="onSlideChange"
			@swiper="onSwiper">
			<swiper-slide
				v-for="(image,index) in imageSrc"
				:key="index">
				<div :style="`background:url(${image.link}); background-size:cover; background-position:center;`"
					class="h-full w-full">
				</div>
			</swiper-slide>

		</swiper>
	</div>
	<div class="fixed w-full  flex flex-row justify-center items-center py-5 md:bottom-[5%] bottom-[3%]   gap-2">
		<span v-for="(image, index) in imageSrc"
			:key="index"
			:class="`h-2 w-2 cursor-pointer rounded-full ${index == selectedImageIndex ? 'bg-faded_gray' : 'bg-white'}`" @click="handleSliding(index)"></span>
	</div>
	<div
		class="fixed top-0 bottom-0 lg:flex left-0 px-12 h-[95%] flex-row hidden items-center z-10 justify-center cursor-pointer"
		@click="swiperData.slidePrev()">
		<ion-icon :icon="chevronBack" class="text-faded_gray text-[35px]"></ion-icon>
	</div>
	<div
		class="fixed top-0 bottom-0 right-0 px-12 h-[95%] flex-row hidden lg:flex z-10 items-center justify-center cursor-pointer"
		@click="swiperData.slideNext()">
		<ion-icon :icon="chevronForward" class="text-faded_gray text-[35px]"></ion-icon>
	</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

import { IonIcon } from '@ionic/vue'
import { chevronBack, chevronForward } from 'ionicons/icons'
import { showModal, imageSrc, selectedImageIndex } from '@app/composable/core/Modal'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'

export default defineComponent({
	setup () {

		const swiperData = ref({
			slideTo: Function,
			update: Function,
			slideNext: Function,
			slidePrev: Function
		})

		const handleSliding = (index: number) => {
			swiperData.value.slideTo(index.toString())

			swiperData.value.update()

			selectedImageIndex.value = index
		}

		const onSwiper = (swiper: any) => {

			swiperData.value = swiper

			handleSliding(selectedImageIndex.value)

		}

		const onSlideChange = (index: any) => {

			selectedImageIndex.value = index.activeIndex
		}

		return {
			chevronBack,
			chevronForward,
			showModal,
			imageSrc,
			swiperData,
			onSwiper,
			onSlideChange,
			handleSliding,
			selectedImageIndex
		}
	},
	components: { IonIcon, Swiper, SwiperSlide },
})
</script>

