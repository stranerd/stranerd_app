<template>
	<div class="w-full lg:h-[696px] h-auto flex bg-primaryBg py-12 relative">
		<div class="container mx-auto text-primaryText p-6 flex justify-start items-center">
			<article class="md:max-w-[560px]">
				<h1 class=" w-full md:text-6xl text-2xl font-bold pr-24 md:pr-0">
					All your academic needs in one place
				</h1>
				<p class="mt-4 mb-8 text-xs md:text-lg">
					Get access to expert tutors, homework help, test and exam help, and solution manuals tailored to
					your courses,
				</p>
				<router-link class="btn bg-warning" to="/auth/signin">
					Get Started
				</router-link>
			</article>

		</div>

		<img alt="hero" class="absolute right-0 top-0 hidden 2xl:block" src="@/assets/images/landing/hero.png">
		<img alt="hero" class="absolute right-0 top-0 hidden lg:block 2xl:hidden"
			src="@/assets/images/landing/hero-md.png">
	</div>
</template>

<style lang="scss" scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
</style>
