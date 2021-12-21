<template>
	<div class="w-full relative bg-primary min-h-[80vh] flex justify-between items-center ">
		<div class="flex justify-center items-center mx-auto max-w-[100rem]">
			<div class="w-6/12 flex flex-col"> 
				<ion-text class="text-white text-5xl font-bold">
					Start STUDYING
					BETTER. SMARTER. FASTER.
					ANYTIME. ANYWHERE.
				</ion-text>
				<ion-text class="text-2xl text-white">
					With Test Prep, Flashcards, Notes and Expert Answers.
				</ion-text>
				<ion-button class="btn-outline w-80 text-2xl block">
					Get Started Now
				</ion-button>

				<ion-text class="text-2xl text-white mt-8">
					or download the app instead
				</ion-text>
				<div class="flex gap-4">
					<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/playstore.svg">
					<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/appstore.svg">
				</div>
			</div>

			<div class="w-6/12">
				<img alt="" class="object-contain h-[100%]" src="@app/assets/images/auth/auth.svg">
			</div>
		</div>
	

	</div>
</template>

<script lang="ts">
export default {
	name: ''
}
</script>


<style scoped>
ion-button{
	--padding-top: 2.125rem !important;
	--padding-bottom: 2.125rem !important;
	--border-width: 2px !important
}
</style>