<template>
	<div class="w-full h-auto flex bg-primaryText py-6">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl">
				<span class="md:text-xl text-sm font-bold text-secondaryText">Our Vision</span>
				<h2 class="md:text-4xl text-2xl font-bold text-bodyText lg:leading-[42px]">To build the largest community of students and educators</h2>
				<p class="md:text-xl text-sm text-bodyText">
					We want to bring the most value to education by improving the interactivity of students with educators.
				</p>
				<router-link class="btn bg-primaryBg text-primaryText" to="/auth/signup">
					Join today
				</router-link>
			</div>
			<img alt="hero" class="w-auto" src="@/assets/images/landing/vision.png">
		</div>
	</div>

	<div class="w-full h-auto flex bg-primaryText pb-6">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 md:items-center justify-center">
			<img alt="hero" class="w-auto" src="@/assets/images/landing/mission.png"/>
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl">
				<span class="md:text-xl text-sm font-bold text-secondaryText">Our Mission</span>
				<h2 class="md:text-4xl text-2xl font-bold text-bodyText lg:leading-[42px]">Providing tools and resources to improve education</h2>
				<p class="md:text-xl text-sm text-bodyText">
					We are creating solutions fundamental to the betterment of academic enviroments, making learning easier and efficient.
				</p>
				<router-link class="btn bg-primaryBg text-primaryText" to="/auth/signup">
					Sign up
				</router-link>
			</div>
		</div>
	</div>
	<div class="w-full h-auto flex items-center justify-center bg-primaryBg px-6 py-12">
		<div>
			<p class="text-primaryText text-xl md:text-3xl mb-6 text-center">Join the Stranerd community today</p>
			<router-link to="/" class="btn bg-primaryText text-primaryBg mx-auto">
				Sign up
			</router-link>
		</div>
	</div>
	<App/>
	<Testimonial/>
	<Supported />

</template>

<script lang="ts" setup>
import Supported from '@app/components/landing/Supported.vue'
import App from '@app/components/landing/App.vue'
import Testimonial from '@app/components/landing/Testimonial.vue'
</script>

<style lang="scss" scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
.btn {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
</style>
