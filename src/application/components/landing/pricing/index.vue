<template>
	<div class="w-full lg:min-h-[696px] h-auto bg-primaryText py-6 ">
		<Features/>
		<div class="w-full h-auto flex items-center justify-center bg-primaryBg px-6 py-12">
			<div>
				<p class="text-primaryText text-xl md:text-3xl mb-6 text-center">Subscribe to Stranerd Premium at <b>N2000</b>/month</p>
				<router-link to="/" class="btn bg-primaryText text-primaryBg mx-auto">
					Get started
				</router-link>
			</div>
		</div>
		<App/>
		<Testimonial/>
		<!-- <div class="container mx-auto text-bodyText p-6 flex flex-col  md:items-center justify-center">
			<h1 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">Flexible Plans</h1>
			<p class="lg:text-2xl text-sm mb-16">Choose a plan that works best for you</p>
			<PlansList class="p-4 lg:px-12 w-full" />
		</div> -->
	</div>
</template>

<script lang="ts" setup>
import PlansList from '@app/components/payment/plans/PlansList.vue'
import Features from './Features.vue'
import App from '../App.vue'
import Testimonial from './Testimonial.vue'
</script>


<style scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
</style>