<template>
	<HomeLayout>
		<div class="pricing_header text-primaryText text-center h-[72px] md:h-[100px] w-full relative flex items-center justify-center">
			<div class="overlay absolute top-0 left-0 w-full h-full bg-[rgba(5,9,13,.500)] "></div>
			<h1 class="relative text-2xl md:text-5xl font-bold">What we offer</h1>
		</div>
		<Pricing />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import Pricing from '@app/components/landing/pricing/index.vue'

export default defineComponent({
	name: 'SolutionsSchools',
	components: { Pricing },
	setup () {
		useRouteMeta('Pricing', {})
	}
})
</script>

<style scoped>
.pricing_header{
	background-image: url('@/assets/images/newLanding/pricing_header_banner.png');
	background-size: cover;
	background-position: center 80%;
}

@media screen and (min-width: 768px) {
	.pricing_header{
		background-position: center 70%;
	}
}

</style>
