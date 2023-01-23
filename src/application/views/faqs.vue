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

<style lang="scss" scoped>
.pricing_header {
	background: rgb(5 9 13 / 50%) url("@app/assets/images/newLanding/faqs_header_banner.png") center 80%;
	background-size: cover;
	background-blend-mode: darken;
}

@media screen and (min-width: 768px) {
	.pricing_header {
		background-position: center 70%;
	}
}

</style>
