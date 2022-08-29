<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-bodyBg relative py-12 md:py-28 -z-20">
		<div class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Our Vision</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">To build the largest community of lecturers and students</h2>
				<p class="lg:text-lg text-sm">
					We aim to foster seamless academic interactivity. This will go a long way in improving lecturing and learning experiences.
				</p>
				<router-link to="/auth/signup"  class="btn landing_btn-outline">
					Join today
				</router-link>
			</div>
			<img src="@/assets/images/landing/vision.png" alt="hero" class="w-auto z-20">
		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex bg-primaryBg relative py-12 md:py-28 -z-20">
		<div class="container mx-auto text-primaryText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<img src="@/assets/images/landing/mission.png" alt="hero" class="w-auto z-20">
				
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Our Mission</span>
				<h2 class="lg:text-5xl text-3xl font-bold  lg:leading-[62px]">Providing tools and resources to improve education</h2>
				<p class="lg:text-lg text-sm">
					We are creating solutions fundamental to the betterment of academic enviroments, making lecturing and learning easier.
				</p>
				<router-link to="/auth/signup" class="btn landing_btn-outline !border-bodyBg">
					Sign up
				</router-link>
			</div>
		</div>
	</div>

	<Supported />

</template>

<script setup lang="ts">
import Supported from '@app/components/landing/Supported.vue'
</script>

<style scoped>

</style>