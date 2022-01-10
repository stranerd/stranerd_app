<template>
	<div class="w-full md:px-8 px-4 bg-white">
		<div class="container mx-auto flex flex-col max-w-7xl">

			<ion-text class="font-extrabold  mx-auto  lg:my-48 my-20 text-center lg:text-5xl text-base text-main_dark ">
				We make learning easy, convenient and accessible.
			</ion-text>

			<div class="flex justify-between items-center w-full lg:flex-row flex-col gap-5">
				<img alt="testprep image" class="lg:w-1/2" src="@app/assets/images/auth/test.png" />

				<div
					class="lg:px-24 px-5 lg:py-32 py-12 bg-green text-white lg:rounded-[3rem] rounded-3xl lg:w-1/2  w-full flex flex-col max-w-[37.5rem] justify-center items-center lg:gap-6 gap-3">
					<img alt="testprep image" class="lg:w-[3.75rem] w-[2.75rem]"
						src="@app/assets/images/New/testPrep.svg" />
					<ion-text class="font-extrabold lg:text-3xl text-xl">
						Test Prep
					</ion-text>
					<ion-text class="lg:text-xl text-base text-center">
						Practice tests and study solutions of all available questions on gateway exams (WAEC, JAMB,
						JUPEB e.t.c.).
					</ion-text>
				</div>
			</div>

			<div class="flex justify-between items-center w-full lg:flex-row flex-col-reverse mt-24 gap-5">


				<div
					class="lg:px-24 px-5 lg:py-32 py-12 bg-purple text-white lg:rounded-[3rem] rounded-3xl lg:w-1/2 w-full flex flex-col max-w-[37.5rem] justify-center items-center lg:gap-6 gap-3">
					<img alt="flashcard image" class="lg:w-[3.75rem] w-[2.75rem]"
						src="@app/assets/images/New/flashCard.png" />
					<ion-text class="font-extrabold lg:text-3xl text-xl">
						Flashcards
					</ion-text>
					<ion-text class="lg:text-xl text-base text-center">
						Memorize answers to questions on the back of cards. Scientifically proven to help students get
						better grades
					</ion-text>
				</div>

				<img alt="testprep image" class="lg:w-1/2" src="@app/assets/images/auth/flash.png" />
			</div>


			<div class="flex justify-between items-center w-full lg:flex-row flex-col mt-24 gap-5">

				<img alt="testprep image" class="lg:w-1/2" src="@app/assets/images/auth/note.png" />

				<div
					class="lg:px-24 px-5 lg:py-32 py-12 bg-pink text-white lg:rounded-[3rem] rounded-3xl lg:w-1/2 w-full flex flex-col max-w-[37.5rem] justify-center items-center lg:gap-6 gap-3">
					<ion-icon :icon="reader" class=" lg:text-[3.75rem] text-[2.75rem] text-white" />
					<ion-text class="font-extrabold lg:text-3xl text-xl">
						Notes
					</ion-text>
					<ion-text class="lg:text-xl text-base text-center">
						Read beautiful and concise notes that cover every important aspects in topics under different
						subjects.
					</ion-text>
				</div>
			</div>

			<div class="flex justify-between items-center w-full lg:flex-row flex-col-reverse mt-24 gap-5">

				<div
					class="lg:px-24 px-5 lg:py-32 py-12 bg-cyan text-white lg:rounded-[3rem] rounded-3xl lg:w-1/2 w-full flex flex-col max-w-[37.5rem] justify-center items-center lg:gap-6 gap-3">
					<ion-icon :icon="chatboxEllipses" class=" lg:text-[3.75rem] text-[2.75rem] text-white" />
					<ion-text class="font-extrabold lg:text-3xl text-xl">
						Expert Answers
					</ion-text>
					<ion-text class="lg:text-xl text-base text-center">
						Ask questions and get expert answers and detailed explanations to help with your homework and
						studying.
					</ion-text>
				</div>

				<img alt="testprep image" class="lg:w-1/2" src="@app/assets/images/auth/question.png" />
			</div>


		</div>
	</div>
</template>

<script lang="ts">
import { chatboxEllipses, reader } from 'ionicons/icons'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'About',
	setup () {
		return {
			reader, chatboxEllipses
		}
	}
})
</script>

<style scoped>
	.text-orange {
		color: #F5A454;
	}
</style>
