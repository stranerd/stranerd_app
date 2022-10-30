<!-- <template>
	<div class="w-full lg:min-h-[696px] h-auto flex flex-col bg-bodyBg py-12 md:py-28 overflow-x-hidden">
		<h1 class="lg:text-6xl text-4xl font-bold text-primaryBg text-center ">Supported by</h1>
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex gap-8 md:mt-16 overflow-x-auto">
				<img alt="support1" class="w-36 md:w-auto" src="@/assets/images/landing/support1.svg">
				<img alt="support2" class="w-36 md:w-auto" src="@/assets/images/landing/support2.svg">
				<img alt="support3" class="w-36 md:w-auto" src="@/assets/images/landing/support3.svg">
				<img alt="support4" class="w-36 md:w-auto" src="@/assets/images/landing/support4.svg">
			</div>
		</div>

		<h1 class="lg:text-6xl text-4xl font-bold text-primaryBg text-center mt-12">Featured on</h1>
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex gap-8 md:mt-16 overflow-x-auto">
				<img alt="featured1" class="w-36 md:w-auto" src="@/assets/images/landing/featured1.svg">
				<img alt="featured2" class="w-36 md:w-auto" src="@/assets/images/landing/featured2.svg">
				<img alt="featured3" class="w-36 md:w-auto" src="@/assets/images/landing/featured3.svg">
			</div>
		</div>

	</div>
</template> -->


<template>
	<div class="w-full h-auto flex flex-col bg-primaryBg py-4 md:py-8  overflow-x-hidden">
		<!-- <div
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex gap-8 md:mt-16 overflow-x-auto">
				<img alt="support1" class="w-36 md:w-auto" src="@/assets/images/landing/support1.svg">
				<img alt="support2" class="w-36 md:w-auto" src="@/assets/images/landing/support2.svg">
				<img alt="support3" class="w-36 md:w-auto" src="@/assets/images/landing/support3.svg">
				<img alt="support4" class="w-36 md:w-auto" src="@/assets/images/landing/support4.svg">
			</div>
		</div>

		<h1 class="lg:text-6xl text-4xl font-bold text-primaryBg text-center mt-12">Featured on</h1>
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex gap-8 md:mt-16 overflow-x-auto">
				<img alt="featured1" class="w-36 md:w-auto" src="@/assets/images/landing/featured1.svg">
				<img alt="featured2" class="w-36 md:w-auto" src="@/assets/images/landing/featured2.svg">
				<img alt="featured3" class="w-36 md:w-auto" src="@/assets/images/landing/featured3.svg">
			</div>
		</div> -->
		
		<div class="container mx-auto text-primaryText p-6 flex flex-col-reverse lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl text-primaryText">
				<h2 class="lg:text-4xl text-xl font-bold  lg:leading-[62px]">Official Partners</h2>
				<p class="lg:text-lg text-sm">
					Strategic association and collaborations with organizations that provide us with important support.
				</p>
			</div>
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
		</div>
	</div>
</template>