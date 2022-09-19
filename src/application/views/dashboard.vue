<template>
	<DefaultLayout>
		<div class="flex flex-col gap-4 lg:gap-8">
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
				:empty="!questionsLoading && !questionsError && questions.length === 0 ? 'You have no questions currently' : ''"
				:questions="questions"
				route="/account?tab=questions"
				title="Recent Questions">
				<template v-slot:empty>
					<span>Questions you ask will show up here</span>
					<router-link class="flex items-center gap-2" to="/questions/create">
						<span>Ask a question</span>
						<IonIcon :icon="arrowForwardOutline" />
					</router-link>
				</template>
			</QuestionsHorizontalList>
			<FlashCardsHorizontalList
				:empty="!flashCardsLoading && !flashCardsError && flashCards.length === 0 ? 'You have no flashCards currently' : ''"
				:flashCards="flashCards"
				route="/account?tab=flashCards"
				title="Recent Flashcards">
				<template v-slot:empty>
					<span>Flashcards you create will show up here</span>
					<router-link class="flex items-center gap-2" to="/study/flashCards/create">
						<span>Create a flashcard</span>
						<IonIcon :icon="arrowForwardOutline" />
					</router-link>
				</template>
			</FlashCardsHorizontalList>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import QuestionsHorizontalList from '@app/components/questions/questions/QuestionsHorizontalList.vue'
import FlashCardsHorizontalList from '@app/components/study/flashCards/FlashCardsHorizontalList.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useUserQuestionList } from '@app/composable/users/users/questions'
import { useUserFlashCardList } from '@app/composable/users/users/flashCards'
import { arrowForwardOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'Dashboard',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	components: { QuestionsHorizontalList, FlashCardsHorizontalList },
	setup () {
		useRouteMeta('Home', {})
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
