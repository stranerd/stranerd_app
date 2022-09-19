<template>
	<div class="flex flex-col gap-4">
		<div class="showcase-flex">
			<router-link v-for="{ title, sub, route, color } in [
				{ title: 'Ask a question', route: '/questions/create', sub: 'Get expert answers on questions you need help with for homework and learning.', color: 'bg-primaryBg' },
				{ title: 'Create a flashcard', route: '/study/flashCards/create', sub: 'Use flashcards to study for improved memorization to do better in test and exams.', color: 'bg-success' },
				{ title: 'Practice for tests and exams', route: '/study/', sub: 'Study with past questions and solutions, and test preps of your courses.', color: 'bg-royal' },
			]" :key="route" :class="color" :to="route" class="card-sm card-padding flex flex-col text-contrast">
				<span class="flex gap-2 text-lg font-bold">
					<IonText>{{ title }}</IonText>
					<IonIcon :icon="arrowForwardOutline" />
				</span>
				<IonText>{{ sub }}</IonText>
			</router-link>
		</div>
		<QuestionsHorizontalList
			:empty="!questionsLoading && !questionsError && questions.length === 0" :questions="questions"
			emptyMsg="You have no questions currently"
			route="/account?tab=questions"
			title="Recent Questions"
		/>
		<FlashCardsHorizontalList
			:empty="!flashCardsLoading && !flashCardsError && flashCards.length === 0" :flashCards="flashCards"
			emptyMsg="You have no flashcards currently"
			route="/account?tab=flashCards"
			title="Recent FlashCards"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowForwardOutline } from 'ionicons/icons'
import QuestionsHorizontalList from '@app/components/questions/questions/QuestionsHorizontalList.vue'
import FlashCardsHorizontalList from '@app/components/study/flashCards/FlashCardsHorizontalList.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useUserQuestionList } from '@app/composable/users/users/questions'
import { useUserFlashCardList } from '@app/composable/users/users/flashCards'

export default defineComponent({
	name: 'DashboardView',
	components: { QuestionsHorizontalList, FlashCardsHorizontalList },
	setup () {
		const { id } = useAuth()
		const { questions, error: questionsError, loading: questionsLoading } = useUserQuestionList(id.value)
		const { flashCards, error: flashCardsError, loading: flashCardsLoading } = useUserFlashCardList(id.value)
		return {
			arrowForwardOutline, questions, questionsError, questionsLoading,
			flashCards, flashCardsError, flashCardsLoading
		}
	}
})
</script>
