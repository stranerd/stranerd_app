<template>
	<div class="w-full relative bg-primary  h-full flex justify-between items-center lg:py-32 py-10 ">
		<div class="flex flex-col lg:flex-row justify-center items-center mx-auto max-w-[120rem] w-full px-6">
			<div class="lg:w-6/12 w-full flex flex-col lg:items-start items-center lg:text-left text-center gap-3"> 
				<ion-text class="text-white text-xl md:text-3xl leading-6 lg:text-5xl lg:leading-[56px] lg:font-bold font-extrabold capitalize">
					Start studying <br>
					better. smarter. faster. <br>
					anytime. anywhere.
				</ion-text>
				<ion-text class=" text-xs md:text-lg w-[15rem] lg:w-full lg:text-2xl text-white ">
					With Test Prep, Flashcards, Notes and Expert Answers.
				</ion-text>
				<router-link to="/dashboard" class="w-full h-auto mx-auto lg:m-0">
					<ion-button class="btn-outline btn-outline-sm text-white lg:w-[22.5rem] w-[11.25rem] lg:h-[6rem] h-12 mx-auto lg:m-0  lg:text-2xl text-sm md:text-lg block">
						Get Started Now
					</ion-button>
				</router-link>
		

				<ion-text class="text-2xl text-white mt-8 lg:block hidden">
					or download the app instead
				</ion-text>
				<div class="lg:flex gap-4 hidden">
					<router-link to="#">
						<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/playstore.svg">
					</router-link>

					<router-link to="#">
						<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/appstore.svg">
					</router-link>
				
				
				</div>
			</div>

			<div class="lg:w-6/12 max-w-[49rem] w-full lg:mt-0 mt-12">
				<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/auth.svg">
			</div>
			<div class="flex gap-4 lg:hidden mt-5">
				<router-link to="#">
					<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/playstore.svg">
				</router-link>

				<router-link to="#">
					<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/appstore.svg">
				</router-link>
				
				
			</div>
		</div>
	

	</div>
</template>

<script lang="ts">
export default {
	name: ''
}
</script>


<style scoped lang="scss">
ion-button{
	--padding-top: 2.125rem !important;
	--padding-bottom: 2.125rem !important;
	--border-width: 2px !important;

	@media screen and (max-width:680px) {
	--padding-top: 1.8rem !important;
	--padding-bottom: 1.8rem !important;
		
	}

}
</style>