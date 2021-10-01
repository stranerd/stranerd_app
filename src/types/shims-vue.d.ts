declare module '*.vue' {
	import { defineComponent } from 'vue'
	export default defineComponent({}) as ReturnType<defineComponent>
}

declare module 'swiper/vue' {
	import _Vue from 'vue'
	export class Swiper extends _Vue {}
	export class SwiperSlide extends _Vue {}
  }