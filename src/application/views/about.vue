<template>
	<HomeLayout>
		<div class="about_header text-primaryText text-center h-[72px] md:h-[100px] w-full relative flex items-center justify-center">
			<div class="overlay absolute top-0 left-0 w-full h-full bg-[rgba(5,9,13,.500)] "></div>
			<h1 class="relative text-2xl md:text-5xl font-bold">About us</h1>
		</div>
		<About />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import About from '@app/components/landing/about/index.vue'

export default defineComponent({
	name: 'PageAbout',
	components: { About },
	setup () {
		useRouteMeta('About', {})
	}
})
</script>

<style scoped>
.about_header{
	background-image: url('@/assets/images/newLanding/about_header_banner.png');
	background-size: cover;
	background-position: center 80%;
}

@media screen and (min-width: 768px) {
	.about_header{
		background-position: center 70%;
	}
}

</style>