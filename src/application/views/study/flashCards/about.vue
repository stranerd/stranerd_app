<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="flex flex-col gap-4 page-padding items-center">
			<img alt="" class="w-[140px]" src="@app/assets/images/about-flashcards.svg">
			<div class="card-sm flex flex-col card-padding">
				<span class="font-bold text-lg">What is a flashcard?</span>
				<span class="text-secondaryText">
					Flashcard is a study tool that helps students easily remember answers and definitions. It is a card with question or words on the front, and answers or definitions on the back.
				</span>
			</div>
			<div class="card-sm flex flex-col card-padding">
				<span class="font-bold text-lg">How to use</span>
				<ul class="text-secondaryText list-disc pl-4">
					<li>Read the question or word on card’s front</li>
					<li>Answer the question or define the word</li>
					<li>Tap on the card to reveal the answer at the back</li>
					<li>Check if you got the answer right or wrong</li>
					<li>Repeat these steps until you have mastered your answer or definition.</li>
				</ul>
			</div>
			<div class="card-sm flex flex-col card-padding">
				<span class="font-bold text-lg">How to create</span>
				<ul class="text-secondaryText list-disc pl-4">
					<li>
						Input the title of your flashcard set. For example, Calculus Formulas, Physics Revision, e.t.c
					</li>
					<li>Input the question or problem at the front and input the answer at the back</li>
					<li>
						You can choose to add more cards to your flashcard set or not. Then click “Create”. Voila! You
						have created a flashcard set.
					</li>
				</ul>
			</div>
			<router-link class="card-sm gap-4 flex p-4 items-center text-primaryBg w-full"
				to="/study/flashCards/create">
				<span>Go back to create flashcard</span>
				<div class="flex-1" />
				<IonIcon :icon="arrowForwardOutline" />
			</router-link>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { arrowForwardOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'StudyFlashCardsAbout',
	setup () {
		useRouteMeta('About Flashcards', { back: true })
		return { arrowForwardOutline }
	}
})
</script>
