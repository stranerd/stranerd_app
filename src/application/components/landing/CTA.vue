<!-- <template>
	<div class="w-full lg:h-[696px] h-auto flex bg-primaryBg py-12 relative">
		<div class="container mx-auto text-primaryText p-6 flex justify-start items-center">
			<article class="md:max-w-[560px] ">
				<h1 class=" w-full md:text-6xl text-2xl font-bold pr-24 md:pr-0">
					All your academic needs in one place
				</h1>
				<p class="mt-4 mb-8 text-xs md:text-lg">
					Get access to expert tutors, homework help, test and exam help, and solution manuals tailored to your courses,
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
</template> -->

<template>
	<div class="hero w-full lg:h-[696px] md:h-[496px] h-auto px-6 py-12 relative" >
		<div class="overlay absolute top-0 left-0 w-full h-full bg-[rgba(5,9,13,.500)] "></div>
		<div class="mx-auto  text-bodyText p-6 relative">
			<article class="md:max-w-[560px] ">
				<h1 class=" w-full md:text-5xl text-3xl font-bold text-primaryText">
					We make studying easier and enjoyable.
				</h1>
				<p class="mt-4 mb-8 text-primaryText text-sm md:text-xl">
					Get access to expert tutors, homework help, and test & exam help tailored to your courses.
				</p>
				<router-link class="btn bg-primaryText" to="/auth/signin">
					Get Started
				</router-link>
			</article>
		</div>
	</div>
	<div class="bg-bodyBg text-bodyText">
		<div class="mx-auto lg:max-w-[1200px] text-bodyText p-6 py-8 flex flex-col md:flex-row items-center justify-center gap-4">
			<div class="bg-primaryBg h-[48px] w-[80px] text-primaryText rounded-[70%] -skew-y-12 flex items-center justify-center">
				<span class="text-lg relative">A
					<span class="absolute -top-2 -right-1/2">+</span>
				</span>
			</div>
			<p class="text-xl md:text-3xl font-bold text-center">Get better grades in assignment, tests and exams with Stranerd</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
div.hero{
	background-image: url('../../assets/images/newLanding/hero.png');
	background-size: cover;
	background-position: right bottom;
}
</style>
