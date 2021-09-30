
<template>
	<swiper :pagination="true" class="mySwiper">
		<swiper-slide>Slide 1</swiper-slide>
		<swiper-slide>Slide 2</swiper-slide>
		<swiper-slide>Slide 3</swiper-slide>
		<swiper-slide>Slide 4</swiper-slide>
	</swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'


// import Swiper core and required modules
import SwiperCore, {
	Pagination
} from 'swiper'

// install Swiper modules
SwiperCore.use([Pagination])


export default {
	components: {
		Swiper,
		SwiperSlide,
	},
	data() {
		return {
        
        
		}
	},
	methods: {
    
	}
  
}
</script>