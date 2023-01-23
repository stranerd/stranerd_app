<template>
	<div class="w-full lg:min-h-[696px] h-auto bg-primaryText py-6 ">
		<Features />
		<div class="w-full h-auto flex items-center justify-center bg-primaryBg px-6 py-12">
			<div>
				<p class="text-primaryText text-xl md:text-3xl mb-6 text-center">Subscribe to Stranerd Premium at <b>N2000</b>/month
				</p>
				<router-link class="btn bg-primaryText text-primaryBg mx-auto" to="/">
					Get started
				</router-link>
			</div>
		</div>
		<App />
		<Testimonial />
	</div>
</template>

<script lang="ts" setup>
import Features from './Features.vue'
import App from '../App.vue'
import Testimonial from '../Testimonial.vue'</script>

<style lang="scss" scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs;
}
</style>
