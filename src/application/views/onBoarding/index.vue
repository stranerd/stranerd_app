<template>
	<Swiper
		:dynamic-bullets="true"
		:dynamic-main-bullets="1"
		:modules="modules"
		:free-mode="true"
		:pagination="{ clickable: true }"
		:space-between="10"
		class="flex flex-row w-full h-screen justify-between items-stretch"
	>
		<SwiperSlide>
			<SlideOne/>
		</SwiperSlide>
		<SwiperSlide>
			<SlideTwo/>
		</SwiperSlide>
		<SwiperSlide>
			<SlideThree/>
		</SwiperSlide>
		<SwiperSlide>
			<SlideFour/>
		</SwiperSlide>
	</Swiper>



</template>


<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Pagination } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import SlideOne from './slideOne.vue'
import SlideTwo from './slideTwo.vue'
import SlideThree from './slideThree.vue'
import SlideFour from './slideFour.vue'
export default {
	name: '',
	components: {
		Swiper,
		SwiperSlide,
		SlideOne,
		SlideTwo,
		SlideThree,
		SlideFour
	},
	setup () {

		return {
			modules: [Pagination]
		}
	},

}
</script>

<style scoped>

</style>