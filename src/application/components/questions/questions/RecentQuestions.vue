<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text class="mr-3">
					Questions
				</ion-text>
				<ion-badge class="uppercase">
					Latest
				</ion-badge>
			</div>

			<router-link class="text-primary text-body flex items-center font-bold" to="/questions">
				<span>explore</span>
			</router-link>
		</div>

		<EmptyState v-if="questions.length === 0"
			btnText="Ask a question"
			info="You have no recent questions! Start asking questions to help with homework and studying."
			route="/questions"
		/>
		<div v-else class="showcase">
			<QuestionListCard v-for="question in questions" :key="question.hash" :question="question" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import QuestionListCard from '@app/components/questions/questions/RecentQuestionListCard.vue'
import { useQuestionList } from '@app/composable/questions/questions'
import EmptyState from '@app/components/core/EmptyState.vue'
import { IonBadge } from '@ionic/vue'

export default defineComponent({
	name: 'RecentQuestions',
	components: { QuestionListCard, EmptyState, IonBadge },
	setup () {
		const { questions: allQuestions, loading, error } = useQuestionList()
		const questions = computed({
			get: () => allQuestions.value.slice(0, 3),
			set: () => {
			}
		})

		return {
			chevronForwardOutline, chevronBackOutline, ellipse,
			questions, loading, error
		}
	}
})
</script>
