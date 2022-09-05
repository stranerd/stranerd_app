<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-bodyBg py-12 md:py-28">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Our Vision</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">To build the largest
					community of lecturers and students</h2>
				<p class="lg:text-lg text-sm">
					We aim to foster seamless academic interactivity. This will go a long way in improving lecturing and
					learning experiences.
				</p>
				<router-link class="btn landing_btn-outline" to="/auth/signup">
					Join today
				</router-link>
			</div>
			<img alt="hero" class="w-auto" src="@/assets/images/landing/vision.png">
		</div>
	</div>

	<div class="w-full lg:min-h-[696px] h-auto flex bg-primaryBg py-12 md:py-28">
		<div
			class="container mx-auto text-primaryText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<img alt="hero" class="w-auto" src="@/assets/images/landing/mission.png">

			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Our Mission</span>
				<h2 class="lg:text-5xl text-3xl font-bold  lg:leading-[62px]">Providing tools and resources to improve
					education</h2>
				<p class="lg:text-lg text-sm">
					We are creating solutions fundamental to the betterment of academic enviroments, making lecturing
					and learning easier.
				</p>
				<router-link class="btn landing_btn-outline !border-bodyBg" to="/auth/signup">
					Sign up
				</router-link>
			</div>
		</div>
	</div>

	<Supported />

</template>

<script lang="ts" setup>
import Supported from '@app/components/landing/Supported.vue'</script>
