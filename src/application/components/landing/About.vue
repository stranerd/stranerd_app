<template>
	<div class="w-full md:px-8 px-4">
		<div class="container mx-auto flex flex-col max-w-7xl">
			<IonText
				class="font-extrabold mx-auto lg:my-48 my-20 text-center lg:text-5xl text-base text-secondaryText ">
				We make learning easy, convenient and accessible.
			</IonText>
			<div class="flex justify-between items-center w-full lg:flex-row flex-col gap-5">
				<img alt="testprep image" class="lg:w-1/2" src="@app/assets/images/auth/test.png" />
				<div
					class="lg:px-24 px-5 lg:py-32 py-12 lg:rounded-[3rem] rounded-3xl lg:w-1/2 w-full flex flex-col max-w-[37.5rem] justify-center items-center lg:gap-6 gap-3">
					<img alt="testprep image" class="lg:w-[3.75rem] w-[2.75rem]"
						src="@app/assets/images/New/testPrep.svg" />
					<IonText class="font-extrabold text-xl">
						Test Prep
					</IonText>
					<IonText class="lg:text-xl text-base text-center">
						Practice tests and study solutions of all available questions on gateway exams (WAEC, JAMB,
						JUPEB e.t.c.).
					</IonText>
				</div>
			</div>
			<div class="flex justify-between items-center w-full lg:flex-row flex-col-reverse mt-24 gap-5">
				<div
					class="lg:px-24 px-5 lg:py-32 py-12 lg:rounded-[3rem] rounded-3xl lg:w-1/2 w-full flex flex-col max-w-[37.5rem] justify-center items-center lg:gap-6 gap-3">
					<img alt="flashcard image" class="lg:w-[3.75rem] w-[2.75rem]"
						src="@app/assets/images/New/flashCard.png" />
					<IonText class="font-extrabold lg:text-3xl text-xl">
						Flashcards
					</IonText>
					<IonText class="lg:text-xl text-base text-center">
						Memorize answers to questions on the back of cards. Scientifically proven to help students
						get
						better grades
					</IonText>
				</div>
				<img alt="testprep image" class="lg:w-1/2" src="@app/assets/images/auth/flash.png" />
			</div>
			<div class="flex justify-between items-center w-full lg:flex-row flex-col mt-24 gap-5">
				<img alt="testprep image" class="lg:w-1/2" src="@app/assets/images/auth/note.png" />
				<div
					class="lg:px-24 px-5 lg:py-32 py-12 lg:rounded-[3rem] rounded-3xl lg:w-1/2 w-full flex flex-col max-w-[37.5rem] justify-center items-center lg:gap-6 gap-3">
					<IonIcon :icon="readerOutline" />
					<IonText class="font-extrabold lg:text-3xl text-xl">
						Notes
					</IonText>
					<IonText class="lg:text-xl text-base text-center">
						Read beautiful and concise notes that cover every important aspects in topics under
						different
						subjects.
					</IonText>
				</div>
			</div>
			<div class="flex justify-between items-center w-full lg:flex-row flex-col-reverse mt-24 gap-5">
				<div
					class="lg:px-24 px-5 lg:py-32 py-12 lg:rounded-[3rem] rounded-3xl lg:w-1/2 w-full flex flex-col max-w-[37.5rem] justify-center items-center lg:gap-6 gap-3">
					<IonIcon :icon="chatboxEllipsesOutline" />
					<IonText class="font-extrabold lg:text-3xl text-xl">
						Expert Answers
					</IonText>
					<IonText class="lg:text-xl text-base text-center">
						Ask questions and get expert answers and detailed explanations to help with your homework
						and
						studying.
					</IonText>
				</div>

				<img alt="testprep image" class="lg:w-1/2" src="@app/assets/images/auth/question.png" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { chatboxEllipsesOutline, readerOutline } from 'ionicons/icons'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'About',
	setup () {
		return {
			readerOutline, chatboxEllipsesOutline
		}
	}
})
</script>
