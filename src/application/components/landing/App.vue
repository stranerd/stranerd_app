<!-- <template>
	<div class="w-full lg:min-h-[696px] h-auto flex bg-primaryBg py-12 md:py-28">
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
						<img alt="playstore button" class="md:h-16" src="@/assets/images/auth/playstore.svg" />
					</a>

					<img alt="appstore button" class=" md:h-16 cursor-not-allowed"
						src="@/assets/images/auth/appstore.svg" />
				</div>
			</div>

			<img alt="hero" class="w-auto" src="@/assets/images/landing/phone.png">
		</div>
	</div>
</template> -->


<template>
	<div class="w-full  h-auto flex bg-primaryText py-12 ">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-6 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl">
				<h2 class="lg:text-4xl text-xl font-bold lg:leading-[62px]">Download our App</h2>
				<p class="lg:text-lg text-sm">
					Wherever you may be, carry Stranerd in your pocket. Get full access from anywhere at anytime with your mobile phone.
				</p>
				<div class="flex gap-4 items-center mt-6">
					<a href="https://play.google.com/store/apps/details?id=com.stranerd.app" rel="noopener noreferrer"
						target="_blank" class=""> 
						<img alt="playstore button" class="md:h-16 " src="@/assets/images/newLanding/play_store.svg" />
					</a>
					<a href="https://play.google.com/store/apps/details?id=com.stranerd.app" rel="noopener noreferrer"
						target="_blank" class=""> 
						<img alt="playstore button" class="md:h-16 " src="@/assets/images/newLanding/apple_store.svg" />
					</a>
					<!-- <img alt="appstore button" class=" md:h-16 cursor-not-allowed"
						src="@/assets/images/auth/appstore.svg" /> -->
				</div>
			</div>
			<div class="w-auto lg:w-1/2 relative">
				<img alt="hero" class=" rounded-2xl" src="@/assets/images/newLanding/mobile_phone.png" />
				<img alt="app_preview" src="@/assets/images/newLanding/app_preview.png" class="w-[46%] absolute top-[19%] left-[35%]">
			</div>
			
		</div>
	</div>
</template>

<style scoped>

a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs
}
</style>