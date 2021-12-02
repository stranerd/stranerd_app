<template>
	<Swiper
		:pagination='{
			"type": "fraction"
		}'
		:direction="direction" :freeMode="freeMode" :slidesPerView="slides">
		<SwiperSlide v-for="(item, index) in items" :key="index" :class="slideClass">
			<slot :index="index" :item="item" />
		</SwiperSlide>
	</Swiper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import  {  SwiperSlide } from 'swiper/vue/swiper-vue'
import SwiperCore, { Swiper,  Pagination,Navigation } from 'swiper'
import 'swiper/swiper-bundle.min.css'

SwiperCore.use([Pagination,Navigation])

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
