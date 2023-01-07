<template>
	<HomeLayout>
		<div
			class="pricing_header text-primaryText text-center h-[72px] md:h-[100px] w-full relative flex items-center justify-center">
			<h1 class="relative text-2xl md:text-5xl font-bold">FAQs</h1>
		</div>
		<Faqs />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import Faqs from '@app/components/landing/faqs/index.vue'

export default defineComponent({
	name: 'PageFAQs',
	components: { Faqs },
	setup () {
		useRouteMeta('FAQs', {})

		return {}
	}
})
</script>

<style scoped>
.pricing_header {
	background: rgba(5, 9, 13, .500) url('@/assets/images/newLanding/faqs_header_banner.png');
	background-size: cover;
	background-position: center 80%;
	background-blend-mode: darken;
}

@media screen and (min-width: 768px) {
	.pricing_header {
		background-position: center 70%;
	}
}

</style>
