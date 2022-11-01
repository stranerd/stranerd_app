<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-bodyBg py-12 md:py-28 relative">
		<img alt="hero" class="absolute md:-left-20 -left-40 -top-80" src="@/assets/images/landing/orange.svg">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center relative">
			<img alt="hero" class="w-auto" src="@/assets/images/landing/why-us.png">

			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl">
				<span class="md:text-lg text-sm">Why choose Stranerd?</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">Giving access to
					infrastructures that improve education</h2>
				<p class="lg:text-lg text-sm">
					At stranerd, we are on a mission to make scaling through school a more easier and affordable process
					for students, while equipping lecturers with tools to provide a more palatable learning experience
					for students.
				</p>
				<router-link class="btn landing_btn-outline" to="/auth/signin">
					Join today
				</router-link>
			</div>
		</div>
	</div>
</template>
