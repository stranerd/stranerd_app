<template>

	<div class="w-full h-full bg-primary flex flex-col justify-between">
		<div class="bg-white h-[40%] rounded-b-[35%] flex flex-col justify-center items-center gap-4 ">
			<img alt="" class="w-12" src="@app/assets/images/New/testPrep.svg" />
			<ion-text class="text-xl text-main_dark font-bold" >
				Test Prep
			</ion-text>
			<ion-text class="text-base text-main_dark max-w-[80vw] text-center" >
				Practice tests and study solutions of all available questions on gateway exams (WAEC, JAMB, JUPEB e.t.c.).
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
	name: 'slideOne',


}
</script>

