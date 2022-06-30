<template>
	<div class="w-full relative  flex justify-between items-start lg:py-32 py-10 pb-20 ">
		<div class="flex flex-col lg:flex-row justify-center items-center mx-auto max-w-[120rem] w-full px-6">
			<div
				class="lg:w-6/12 w-full h-auto flex flex-col lg:items-start items-center lg:text-left text-center gap-3">
				<IonText
					class="text-xl md:text-3xl leading-6 lg:text-5xl lg:leading-[56px] lg:font-bold font-extrabold capitalize">
					Start studying <br>
					better. smarter. faster. <br>
					anytime. anywhere.
				</IonText>
				<IonText class=" text-xs md:text-lg w-[15rem] lg:w-full lg:text-2xl">
					With Test preps, Flashcards, Notes and Expert Answers.
				</IonText>
				<router-link class="h-auto mx-auto lg:m-0" to="/dashboard">
					<IonButton
						class="btn-outline mx-auto lg:m-0 lg:text-2xl text-sm md:text-lg block">
						Get Started Now
					</IonButton>
				</router-link>
				<IonText class="mt-8 lg:block hidden">
					or download the app instead
				</IonText>
				<div class="lg:flex gap-4 hidden">
					<a href="https://play.google.com/store/apps/details?id=com.stranerd.app"
						target="_blank">
						<img alt="" class="object-contain h-[100%]"
							src="@app/assets/images/auth/playstore.svg">
					</a>
					<!--<router-link to="#">
									<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/appstore.svg">
								</router-link> -->
				</div>
			</div>
			<div class="sm:hidden max-w-[49rem] h-60 w-full lg:mt-0 mt-12 ">
				<img alt="" class="object-contain" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="md:w-6/12 max-w-[49rem] w-full lg:mt-0 mt-12 hidden sm:block">
				<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/auth.png">
			</div>
			<div class="flex gap-4 lg:hidden mt-5">
				<a href="https://play.google.com/store/apps/details?id=com.stranerd.app" target="_blank">
					<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/playstore.svg">
				</a>

				<!-- <router-link to="#">
					<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/appstore.svg">
				</router-link> -->
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	ion-button {
		--padding-top: 1.5rem !important;
		--padding-bottom: 1.5rem !important;
		--border-width: 2px !important;
	}
</style>
