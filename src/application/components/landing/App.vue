<template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-primaryBg relative py-12 md:py-28 -z-20">
		<div
			class="container mx-auto text-primaryText p-6 flex flex-col-reverse lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl ">
				<span class="md:text-lg text-sm">Our App</span>
				<h2 class="lg:text-5xl text-3xl font-bold  lg:leading-[62px]">Full access from anywhere at anytime</h2>
				<p class="lg:text-lg text-sm">
					Wherever you may be, you can carry Stranerd in your pocket. With your mobile device, you have
					unlimited access to any activity.
				</p>
				<div class="flex gap-4 items-center mt-6">
					<a href="https://play.google.com/store/apps/details?id=com.stranerd.app" rel="noopener noreferrer"
						target="_blank">
						<img alt="playstore button" class="h-6 md:h-16" src="@/assets/images/auth/playstore.svg" />
					</a>

					<img alt="appstore button" class="h-6  md:h-16 cursor-not-allowed"
						src="@/assets/images/auth/appstore.svg" />
				</div>
			</div>

			<img alt="hero" class="w-auto z-20" src="@/assets/images/landing/phone.svg">
		</div>

	</div>
</template>
