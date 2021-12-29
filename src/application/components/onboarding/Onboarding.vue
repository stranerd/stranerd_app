<template>
	<Swiper
		:dynamic-bullets="true"
		:dynamic-main-bullets="1"
		:free-mode="true"
		:modules="modules"
		:pagination="{ clickable: true }"
		:space-between="10"
		class="flex flex-row w-full h-screen justify-between items-stretch"
	>
		<SwiperSlide>
			<SlideOne />
		</SwiperSlide>
		<SwiperSlide>
			<SlideTwo />
		</SwiperSlide>
		<SwiperSlide>
			<SlideThree />
		</SwiperSlide>
		<SwiperSlide>
			<SlideFour />
		</SwiperSlide>
	</Swiper>
</template>

<script lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import { Pagination } from 'swiper'
import 'swiper/swiper-bundle.min.css'
import SlideOne from '@app/components/onboarding/SlideOne.vue'
import SlideTwo from '@app/components/onboarding/SlideTwo.vue'
import SlideThree from '@app/components/onboarding/SlideThree.vue'
import SlideFour from '@app/components/onboarding/SlideFour.vue'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Onboarding',
	components: {
		Swiper,
		SwiperSlide,
		SlideOne,
		SlideTwo,
		SlideThree,
		SlideFour
	},
	setup () {
		return { modules: [Pagination] }
	}
})
</script>

<style scoped>

</style>
