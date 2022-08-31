<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-primaryBg relative py-12 md:py-28 -z-20">
		<div
			class="container mx-auto text-primaryText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Stranerd connect</span>
				<h2 class="lg:text-5xl text-3xl font-bold  lg:leading-[62px]">Leverage the presence of millions of
					users</h2>
				<p class="lg:text-lg text-sm">
					Connect with students outside the boundaries of your class and school to collaborate or learn from.
				</p>
				<router-link class="landing_btn-outline btn !border-bodyBg" to="/connect">
					Learn more
				</router-link>
			</div>

			<img alt="hero" class="w-auto z-20" src="@/assets/images/landing/connect.png">
		</div>

	</div>
</template>
