<template>
	<DefaultLayout>
		<div class="flex page-padding flex-col gap-8">
			<div class="flex flex-col gap-2">
				<IonText class="font-bold text-lg">Assignment help</IonText>
				<IonText class="text-secondaryText">Get expert answers to questions you need help</IonText>
				<router-link class="w-full mt-2" to="/questions/create">
					<IonButton class="btn-primary w-full">
						<div class="flex w-full items-center gap-4">
							<IonIcon :icon="helpCircleOutline" />
							<span class="flex-1 text-left">Ask a question</span>
							<IonIcon :icon="arrowForwardOutline" />
						</div>
					</IonButton>
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
import { arrowForwardOutline, helpCircleOutline } from 'ionicons/icons'

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
			helpCircleOutline, arrowForwardOutline, questions, questionsError, questionsLoading,
			flashCards, flashCardsError, flashCardsLoading
		}
	}
})
</script>
