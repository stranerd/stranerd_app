<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-primaryBg relative py-12 md:py-28 -z-20">
		<div class="container mx-auto text-primaryText p-6 flex flex-col-reverse lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Our App</span>
				<h2 class="lg:text-5xl text-3xl font-bold  lg:leading-[62px]">Full access from anywhere at anytime</h2>
				<p class="lg:text-lg text-sm">
					Wherever you may be, you can carry Stranerd in your pocket. With your mobile device, you have unlimited access to any activity.
				</p>
				<div class="flex gap-4 items-center mt-6">
					<a href="https://play.google.com/store/apps/details?id=com.stranerd.app" target="_blank" rel="noopener noreferrer">
						<img src="@/assets/images/auth/playstore.svg" alt="playstore button" class="md:h-16"  />
					</a>
				
					<img src="@/assets/images/auth/appstore.svg" alt="appstore button" class=" md:h-16 cursor-not-allowed" />
				</div>
			</div>

			<img src="@/assets/images/landing/phone.svg" alt="hero" class="w-auto z-20">
		</div>

	</div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>