<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-primaryBg relative py-12 md:py-28 -z-20">
		<div class="container mx-auto text-primaryText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Our aim</span>
				<h2 class="lg:text-5xl text-3xl font-bold  lg:leading-[62px]">Making academic activities seamless</h2>
				<p class="lg:text-lg text-sm">
					We target growth in metrics that directly lead to a better lecturing and learning experiences, bringing about ease to the daily activities of students and lecturers.
				</p>
				<router-link to="/auth/signin"  class="btn landing_btn-outline !border-bodyBg">
					Get started
				</router-link>
			</div>

			<img src="@/assets/images/landing/aim.svg" alt="hero" class="w-auto z-20">
		</div>

	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>