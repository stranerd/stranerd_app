<template>
	<div class="hero w-full lg:h-[696px] flex justify-start items-center md:h-[496px] h-auto lg:px-9 px-4 py-12" >
		
		<article class="container mx-auto text-white">
			<div class="md:max-w-[560px] ">
				<h1 class=" w-full md:text-5xl text-3xl font-bold ">
					We make studying easier and enjoyable.
				</h1>
				<p class="mt-4 mb-8 text-sm md:text-xl">
					Get access to expert tutors, homework help, and test & exam help tailored to your courses.
				</p>
				<router-link class="btn bg-primaryText text-bodyText" to="/auth/signin">
					Get Started
				</router-link>
			</div>
		</article>

	</div>

	<div class="bg-itemBg text-bodyText">
		<div class="mx-auto lg:max-w-[1200px] text-bodyText p-6 py-8 flex flex-col md:flex-row items-center justify-center gap-4">
			<div class="bg-primaryBg h-[48px] w-[80px] text-primaryText rounded-[70%] -skew-y-12 flex items-center justify-center">
				<span class="text-lg relative">A
					<span class="absolute -top-2 -right-1/2">+</span>
				</span>
			</div>
			<p class="text-2xl md:text-3xl font-bold text-center">Get better grades in assignment, tests and exams with Stranerd</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
.hero{
	background: rgba(5,9,13,.500) url('../../assets/images/newLanding/hero.png');
	background-size: cover;
	background-blend-mode: darken;
}
</style>
