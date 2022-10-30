<!-- <template>
	<div id="solutions" class="w-full lg:min-h-[696px] h-auto flex flex-col bg-bodyBg py-12 md:py-28">
		<h1 class="lg:text-6xl text-4xl font-bold text-primaryBg text-center ">Our product</h1>
		<div
			v-for="product in products"
			:key="product.name"
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center product lg:mt-32 mt-12">
			<img :src="product.img" alt="hero" class="w-auto">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">{{ product.super }}</span>
				<h2 class="lg:text-5xl text-3xl font-bold  text-primaryBg lg:leading-[62px]">{{ product.name }}</h2>
				<p class="lg:text-lg text-sm">
					{{ product.sub }}
				</p>
				<router-link v-if="product.link" :to="product.link" class="btn landing_btn-outline">
					Learn More
				</router-link>
				<button v-else class="btn text-danger bg-[#ff32323d]">
					Coming soon
				</button>
			</div>
		</div>
	</div>
</template> -->

<template>
	<div id="solutions" class="w-full lg:min-h-[696px] h-auto flex flex-col bg-primaryText py-8">
		<div
			v-for="product in products"
			:key="product.name"
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center product lg:mt-20 mt-12">
			<img :src="product.img" alt="hero" class="w-auto lg:max-w-[50%] rounded-2xl">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<h2 class="md:text-4xl text-xl font-bold  text-bodyText lg:leading-[62px]">{{ product.name }}</h2>
				<p class="md:text-xl text-sm">
					{{ product.sub }}
				</p>
				<router-link :to="product.link" class="btn bg-primaryBg text-primaryText">
					Get started
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const products = [
	{
		name: 'Get assignment help',
		sub: 'When you get stuck on a tough question while studying or doing your assignment, our expert tutors are ready to provide a well explained answer for you.',
		link: 'solutions/students',
		img: new URL('@/assets/images/newLanding/assignment.png', import.meta.url).href
	},
	{
		name: 'Study with flashcards',
		sub: 'Multiple researches have proven that studying regularly with flashcards help students easily remember answers and definitions. Create or find flashcards to study with online',
		link: 'solutions/schools',
		img: new URL('@/assets/images/newLanding/flashcards.png', import.meta.url).href
	},
	{
		name: 'Ranking on leaderboard',
		sub: 'Get awarded points to increase your rank by utilizing study tools and materials. Fight for the daily, weekly, monthly, or overall top spot in your department or in general.',
		link: '/',
		img: new URL('@/assets/images/newLanding/ranking.png', import.meta.url).href
	}
]
</script>

<style lang="scss" scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
@media screen and (min-width: $lg) {
	.product:nth-child(odd) {
		flex-direction: row-reverse;
	}
}

.btn {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
</style>
