<template>
	<div class="flex items-center p-8 flex-col text-center gap-2 border border-itemBg roundex-xl">
		<img class="w-24 mb-2" src="@/assets/images/emptyStates/answer.png">
		<p class="text-lg font-bold">No answers</p>
		<span class="text-center text-secondaryText">An expert tutor will answer this question soon.</span>
	</div>
	<div class="flex flex-col gap-4">
		<IonText class="font-bold text-lg">Suggested actions</IonText>
		<div class="flex flex-col gap-4 w-full text-secondaryText">
			<router-link v-for="{ title, route, icon } in [
				{ title: 'Ask a question', route: '/questions/create', icon: helpCircleOutline },
				{ title: 'Create a flashcard', route: '/study/flashCards/create', icon: copyOutline },
				{ title: 'Practice for tests and exams', route: '/study/', icon: bookOutline },
			]" :key="route" :to="route" class="card-sm card-padding !gap-4 items-center flex">
				<IonIcon :icon="icon" />
				<IonText>{{ title }}</IonText>
				<IonIcon :icon="arrowForwardOutline" class="ml-auto" />
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowForwardOutline, bookOutline, copyOutline, helpCircleOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'EmptyAnswers',
	setup () {
		return { arrowForwardOutline, helpCircleOutline, copyOutline, bookOutline }
	}
})
</script>
