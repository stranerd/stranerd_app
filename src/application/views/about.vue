<template>
	<HomeLayout>
		<div
			class="about_header text-primaryText text-center h-[72px] md:h-[100px] w-full relative flex items-center justify-center">
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

<style lang="scss" scoped>
.about_header {
	background: rgb(5 9 13 / 50%) url("@app/assets/images/newLanding/about_header_banner.png") center 80%;
	background-size: cover;
	background-blend-mode: darken;
}

@media screen and (min-width: 768px) {
	.about_header {
		background-position: center 70%;
	}
}

</style>
