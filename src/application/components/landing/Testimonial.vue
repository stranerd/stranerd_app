<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-bodyBg relative py-12 md:py-28 -z-20">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<img alt="hero" class="w-auto z-20" src="@/assets/images/landing/testi.svg">

			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Testimonials</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">What our users say</h2>
				<p class="lg:text-lg text-sm">
					Feedback from personels in the education community on the impact Stranerd has on their academic
					activities.
				</p>
				<router-link class="btn landing_btn-outline" to="/auth/signin">
					Join today
				</router-link>
			</div>
		</div>
	</div>
</template>
