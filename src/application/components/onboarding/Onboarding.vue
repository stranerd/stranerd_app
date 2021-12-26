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
import { defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storage } from '@utils/storage'

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
		const router = useRouter()

		onMounted(async () => {
			const isOnboardingDone = await storage.get('onboarding-done')
			if (isOnboardingDone) await router.replace('/dashboard')
			else await storage.set('onboarding-done', true)
		})

		return { modules: [Pagination] }
	}
})
</script>

<style scoped>

</style>
