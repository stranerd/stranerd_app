<template>

	
	<swiper
		class="md:hidden overflow-x-auto" :direction="'horizontal'"  :freeMode="true" 
	>
		<swiper-slide 
			class="!w-24 mr-3"
			v-for="(photo, index) in photos" :key="index + 'photo'">
			<div class="rounded-lg border-[1px] border-faded_gray bg-light_gray h-24 md:h-28 w-24 md:w-28"
				@click="showImage(photos,index)"
				:style="`background:url(${photo.link}); background-size:cover; background-position:center;`">
			</div>
		</swiper-slide>
				
	</swiper>

	<swiper   class=" hidden w-full md:block" :freeMode="true"  
		@swiper="onSwiper"
	>
		<swiper-slide
			class="!w-40 mr-4"
			v-for="(photo, index) in photos" :key="index + 'photo'">
			<div class="rounded-lg border-[1px] border-faded_gray bg-light_gray h-36 w-40 cursor-pointer"
				@click="showImage(photos,index)"
				:style="`background:url(${photo.link}); background-size:cover; background-position:center;`">
			</div>
		</swiper-slide>
				
	</swiper>
</template>

<script lang="ts">
import { defineComponent,  ref } from 'vue'
import { Media } from '@/modules/core'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper-bundle.min.css'
import { componentName, imageSrc, selectedImageIndex, showModal } from '@/application/composable/core/Modal'

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

		const showImage = (images: Media[] | undefined,index = 0) => {
			 if(images){
				 imageSrc.value = images
				showModal.value = true
				componentName.value = 'photoView'
				selectedImageIndex.value = index
			 }
		}
		return {
			onSwiper,
			swiperData,
			showImage
		}
	}
})
</script>
