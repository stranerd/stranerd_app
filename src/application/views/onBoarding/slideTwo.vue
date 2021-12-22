<template>

	<div class="w-full h-full bg-primary flex flex-col justify-between">
		<div class="bg-white h-[40%] rounded-b-[35%] flex flex-col justify-center items-center gap-4 ">
			<img alt="" class="w-12 " src="@app/assets/images/New/flashcard2.png" />
			<ion-text class="text-xl text-main_dark font-bold" >
				Flashcards
			</ion-text>
			<ion-text class="text-base text-main_dark max-w-[80vw] text-center" >
				Memorize answers to questions on the back of cards. Scientifically proven to help students get better grades
			</ion-text>
		</div>

		<ion-button class="btn-outline text-white w-full mx-auto max-w-[280px] mb-10
		">
			Skip
		</ion-button>
	
	</div>
</template>

<script lang="ts">


export default {
	name: 'slideTwo',


}
</script>

