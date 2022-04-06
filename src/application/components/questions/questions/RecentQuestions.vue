<template>
	<div>
		<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
			<div class="text-main_dark flex items-center">
				<ion-text class="text-heading font-bold mr-3">Questions</ion-text>
				<ion-text class="text-orange flex items-center">
					<div class="h-1 w-1 bg-orange mr-2 rounded-full" />
					Latest
				</ion-text>
			</div>

			<router-link class="text-primary flex items-center font-normal" to="/questions">
				<span>explore</span>
			</router-link>
		</div>

		<EmptyState v-if="!loading && !error && questions.length === 0"
			btnText="Ask a question"
			info="You have no recent questions! Start asking questions to help with homework and studying."
			route="/questions"
		/>
		<BlockLoading v-if="loading" />
		<div class="showcase">
			<QuestionListCard v-for="question in questions" :key="question.hash" :question="question" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import QuestionListCard from '@app/components/questions/questions/RecentQuestionListCard.vue'
import { useQuestionList } from '@app/composable/questions/questions'
import EmptyState from '@app/components/core/EmptyState.vue'

export default defineComponent({
	name: 'RecentQuestions',
	components: { QuestionListCard, EmptyState },
	setup () {
		const { questions: allQuestions, loading, error } = useQuestionList()
		const questions = computed({
			get: () => allQuestions.value.slice(0, 3),
			set: () => {
			}
		})

		return {
			questions, loading, error
		}
	}
})
</script>
