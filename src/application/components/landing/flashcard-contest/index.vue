<template>
	<div class="w-full h-auto flex bg-primaryText py-6">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 md:items-center justify-center">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl">
				<h2 class="md:text-4xl text-2xl font-bold text-bodyText lg:leading-[62px]">Join our <span
					class="text-warning underline">flashcard creators competition</span> stand a chance to win an
					amazing prize</h2>

			</div>
			<div class="flex flex-wrap align-center justify-center md:w-1/2 gap-x-6 md:gap-x-9">
				<div
					class="rounded-full bg-[#17BAA7] h-[120px] w-[120px] md:h-[264px] md:w-[264px] relative overflow-hidden">
					<img src="../../../assets/images/newLanding/flashcard-page/image-one.png" class="object-cover"
						alt="">
				</div>
				<div
					class="rounded-full bg-[#FF8800] h-[120px] w-[120px] md:h-[264px] md:w-[264px] relative overflow-hidden">
					<img src="../../../assets/images/newLanding/flashcard-page/image-two.png" class="object-cover"
						alt="">
				</div>
				<div
					class="rounded-full bg-[#964DDE] h-[120px] w-[120px] md:h-[264px] md:w-[264px] relative overflow-hidden">
					<img src="../../../assets/images/newLanding/flashcard-page/image-three.png" class="object-cover"
						alt="">
				</div>
			</div>
		</div>
	</div>

	<div class="w-full h-auto flex bg-primaryBg py-6">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 md:items-center justify-center">
			<img alt="hero" class="w-auto rounded-2xl" src="@/assets/images/newLanding/flashcard-page/cup.png">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl">
				<span class="md:text-2xl text-xl font-bold text-primaryText">About the contest</span>
				<p class="md:text-lg text-sm text-primaryText">
					This contest is the first of, hopefully, many more to be organised by Stranerd, to help Nigerian
					university students reach their academic goals. Our aim as an edtech company is to introduce
					alternative ways of learning and to provide motivation when needed, hence the contest.

					The Flashcard Contest requires you to build multiple flashcard sets from your course work. While the
					course and topics can vary, flashcard sets are expected to meet a certain standard.
					The contest opens for entries on the xxxx and closes by midnight of xxxx. 12 winners will be
					selected from 12 different faculties, cutting across all Nigerian universities. Selected winners
					will receive cash prizes.

					Meanwhile, don’t forget to tell your friends about the contest. Spread the word!.
				</p>
			</div>
		</div>
	</div>
	<FlashCardForm/>
	<Guidelines/>

	<div class="w-full h-auto flex bg-primaryText py-6">
		<div
			class="container mx-auto text-bodyText p-6 flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 md:items-center justify-center">
			<img alt="hero" class="w-auto rounded-2xl" src="@/assets/images/newLanding/flashcard-page/flashcards_sample.png">
			<div class="flex flex-col md:gap-5 gap-3 md:max-w-xl">
				<span class="md:text-2xl text-xl font-bold text-bodyText">Creating impressive flashcard sets</span>
				<ul>
					<li>Flashcards are not summaries of your notes, they’re for testing your knowledge. So ask questions.</li>
					<li>Have an objective for each set you create.</li>
					<li>One concept per flashcard. Don’t force too many ideas on one card. Spread out.</li>
					<li>Play with colour and use pictures, diagrams etc when you can.</li>
					<li>Don’t forget to throw in the occasional keyword flashcard.</li>
					<li>Some topics are more suited to flashcards than others.</li>
					<li>Take your time.</li>
				</ul>
			</div>
		</div>
	</div>

	<App />

</template>

<script lang="ts" setup>
import App from './App.vue'
import FlashCardForm from './flashcardForm..vue'
import Guidelines from './guidelines.vue'
</script>

<style lang="scss" scoped>
a {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs;
}

.btn {
	@apply rounded-lg h-12 md:h-16 w-[116px] md:w-[165px] md:text-lg text-xs;
}

ul {
	list-style-type: disc;
	list-style-position: outside;
	margin-left: 20px;
}
</style>
