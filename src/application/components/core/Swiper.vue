<template>
	<Swiper :direction="direction" :freeMode="freeMode" :slidesPerView="slides">
		<SwiperSlide v-for="(item, index) in items" :key="index" :class="slideClass">
			<slot :index="index" :item="item" />
		</SwiperSlide>
	</Swiper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import 'swiper/swiper-bundle.min.css'

export default defineComponent({
	name: 'SwiperWrapper',
	components: { Swiper, SwiperSlide },
	props: {
		direction: {
			required: false,
			type: String,
			default: 'horizontal'
		},
		freeMode: {
			type: Boolean,
			required: false,
			default: false
		},
		slides: {
			type: Number,
			required: true,
			default: 3
		},
		slideClass: {
			type: String,
			required: false,
			default: ''
		},
		items: {
			type: Array,
			required: true,
			default: () => []
		}
	}
})
</script>
