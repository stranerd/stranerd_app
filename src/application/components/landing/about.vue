<template>
	<div class="w-full md:px-8 px-4 bg-light_gray">
		<div class="container mx-auto flex flex-col">
			
			<ion-text class="font-extrabold  mx-auto  lg:my-48 my-20 text-center lg:text-5xl text-base text-main_dark ">
				We make learning easy, convenient and accessible.
			</ion-text>

			<div class="flex justify-between items-center w-full">
			

				<div class="px-24 py-32	 bg-green text-white rounded-[3rem] w-1/2 flex flex-col max-w-[37.5rem] justify-center items-center gap-6">
					<img alt="testprep image" class="w-[3.75rem]" src="@app/assets/images/New/testPrep.svg" />
					<ion-text class="font-extrabold text-3xl">
						Test Prep
					</ion-text>
					<ion-text class="text-xl text-center">
						Practice tests and study solutions of all available questions on gateway exams (WAEC, JAMB, JUPEB e.t.c.).
					</ion-text>
				</div>
			</div>

			<div class="flex justify-between items-center w-full mt-24">
			

				<div class="px-24 py-32	 bg-purple text-white rounded-[3rem] w-1/2 flex flex-col max-w-[37.5rem] justify-center items-center gap-6">
					<img alt="flashcard image" class="w-[3.75rem]" src="@app/assets/images/New/flashCard.png" />
					<ion-text class="font-extrabold text-3xl">
						Flashcards
					</ion-text>
					<ion-text class="text-xl text-center">
						Memorize answers to questions on the back of cards. Scientifically proven to help students get better grades
					</ion-text>
				</div>
			</div>


			<div class="flex justify-between items-center w-full mt-24">
			

				<div class="px-24 py-32	 bg-pink text-white rounded-[3rem] w-1/2 flex flex-col max-w-[37.5rem] justify-center items-center gap-6">
					<ion-icon :icon="reader" class=" text-[3.75rem] text-white" />
					<ion-text class="font-extrabold text-3xl">
						Notes
					</ion-text>
					<ion-text class="text-xl text-center">
						Read beautiful and concise notes that cover every important aspects in topics under different subjects.
					</ion-text>
				</div>
			</div>

			<div class="flex justify-between items-center w-full mt-24">

				<div class="px-24 py-32	 bg-cyan text-white rounded-[3rem] w-1/2 flex flex-col max-w-[37.5rem] justify-center items-center gap-6">
					<ion-icon :icon="chatboxEllipses" class=" text-[3.75rem] text-white" />
					<ion-text class="font-extrabold text-3xl">
						Expert Answers
					</ion-text>
					<ion-text class="text-xl text-center">
						Ask questions and get expert answers and detailed explanations to help with your homework and studying.
					</ion-text>
				</div>
			</div>

			<ion-text class="font-extrabold  mx-auto  lg:mt-48 lg:mb-24 mt-20 mb-12 text-center lg:text-5xl text-base text-main_dark ">
				Made for students, loved by students
			</ion-text>

		
			
		</div>
	</div>
</template>

<script lang="ts">
import { reader, chatboxEllipses } from 'ionicons/icons'


export default {
	name: 'about',

	setup(){
		return{
			reader, chatboxEllipses
		}
	}
}
</script>

<style scoped>
	.text-orange {
		color: #F5A454;
	}
</style>
