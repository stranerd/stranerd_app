<template>
	<div id="solutions" class="w-full lg:min-h-[696px] h-auto flex flex-col bg-bodyBg relative py-12 md:py-28">
		<h1 class="lg:text-6xl text-4xl font-bold text-primaryBg text-center ">Our product</h1>
		<div
			v-for="product in products"
			:key="product.name"
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center product lg:mt-32 mt-12">
			<img :src="product.img" alt="hero" class="w-auto z-20">
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
</template>

<script lang="ts" setup>
const products = [
	{
		name: 'Class collaboration and study tools',
		super: 'For students',
		sub: 'Students have the ability to join digital classrooms, create study materials, take test preps, get homework help, and search for existing materials, to aid learning.',
		link: 'solutions/students',
		img: new URL('@/assets/images/landing/product1.png', import.meta.url).href
	},
	{
		name: 'Course and student management',
		super: 'For lecturers',
		sub: 'Providing the means to improve the efficiency and effectiveness of lecturing with tools for interactivity, sharing information and assessing students. ',
		link: 'solutions/schools',
		img: new URL('@/assets/images/landing/product2.png', import.meta.url).href
	},
	{
		name: 'Online learning management system',
		super: 'For schools',
		sub: 'Academic instituitions will be provided with easier means of administrative management, to bolster educating and learning success rate.',
		link: false,
		img: new URL('@/assets/images/landing/product3.png', import.meta.url).href
	}
]
</script>

<style lang="scss" scoped>
@media screen and (min-width: $lg) {
	.product:nth-child(odd) {
		flex-direction: row-reverse;
	}
}

.btn {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
</style>
