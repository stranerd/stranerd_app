<!-- <template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-primaryBg py-12 md:py-28">
		<div
			class="container mx-auto text-primaryText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Stranerd connect</span>
				<h2 class="lg:text-5xl text-3xl font-bold  lg:leading-[62px]">Leverage the presence of millions of
					users</h2>
				<p class="lg:text-lg text-sm">
					Connect with students outside the boundaries of your class and school to collaborate or learn from.
				</p>
				<button class="landing_btn-outline btn !border-bodyBg">
					Coming Soon
				</button>
			</div>

			<img alt="hero" class="w-auto" src="@/assets/images/landing/connect.png">
		</div>
	</div>
</template> -->


<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-primaryBg py-12 md:py-28">
		<div class="container mx-auto text-primaryText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="bg-primaryText rounded flex flex-col md:flex-row  w-auto lg:w-1/2">
				<div class="text-left p-6 border-b md:w-1/2 md:border-b-0 md:border-r">
					<p class="text-sm md:text-xl text-secondaryText font-bold">Basic</p>
					<h3 class="text-xl md:text-2xl text-bodyText font-bold">Free</h3>
					<p class="text-sm md:text-xl text-secondaryText">/forever</p>
					<div class="mt-2 mb-6 flex flex-col">
						<div class="flex items-center gap-4">
							<IonIcon :icon="checkmarkOutline" class="text-success" />
							<p class="text-sm md:text-lg text-bodyText font-bold">Flashcards</p>
						</div>
						<div class="flex items-center gap-4">
							<IonIcon :icon="closeOutline" class="text-danger" />
							<p class="text-sm md:text-lg text-bodyText font-bold">Assignment help</p>
						</div>
					</div>
					<router-link to="/" class="btn bg-primaryBg text-primaryText !w-full ">
						Sign up
					</router-link>
				</div>
				<div class="text-left p-6 md:w-1/2">
					<p class="text-sm md:text-xl text-secondaryText font-bold">Premium</p>
					<h3 class="text-xl md:text-2xl text-bodyText font-bold">₦2000</h3>
					<p class="text-sm md:text-xl text-secondaryText">/month</p>
					<div class="mt-2 mb-6 flex flex-col">
						<div class="flex items-center gap-4">
							<IonIcon :icon="checkmarkOutline" class="text-success" />
							<p class="text-sm md:text-lg text-bodyText font-bold">Flashcards</p>
						</div>
						<div class="flex items-center gap-4">
							<IonIcon :icon="checkmarkOutline" class="text-danger" />
							<p class="text-sm md:text-lg text-bodyText font-bold">Assignment help</p>
						</div>
					</div>
					<router-link to="/" class="btn bg-primaryBg text-primaryText !w-full ">
						Sign up
					</router-link>
				</div>
			</div>
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl text-primaryText">
				<h2 class="lg:text-4xl text-xl font-bold  lg:leading-[62px]">Our Pricing Plans</h2>
				<p class="lg:text-lg text-sm">
					Affordable quality service for accessing expert tutors with free study tools that are guaranteed to improve studying.
				</p>
				<router-link to="/" class="btn bg-primaryText text-primaryBg ">
					Learn more
				</router-link>
			</div>

			<!-- <img alt="hero" class="w-auto" src="@/assets/images/landing/connect.png"> -->
		</div>
	</div>
</template>

<style lang="scss" scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
</style>

<script setup lang="ts">
import { checkmarkOutline, closeOutline } from 'ionicons/icons'

</script>