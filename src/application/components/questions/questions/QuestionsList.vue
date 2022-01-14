<template>
	<div class="text-xs md:text-sm ">
		<div class="lg:mt-8 mt-4">
			<EmptyState v-if="questions.length === 0" :btnText="'Ask a question'"
				:info="'No questions found! Start asking questions to help with homework and studying.'"
				route="/questions/create"
			/>
			<div class="mt-6 col-span-6 flex flex-wrap gap-4">
				<QuestionListCard v-for="question in questions" :key="question.hash" :question="question" />
			</div>
			<div v-if="hasMore" class="text-center py-8 text-lg text-primary w-full font-semibold cursor-pointer">
				<a @click.prevent="fetchOlderQuestions">Load More</a>
			</div>
		</div>
	</div>
	<page-loading v-if="loading" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuestionList } from '@app/composable/questions/questions'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import PageLoading from '@app/components/core/PageLoading.vue'

export default defineComponent({
	name: 'QuestionsList',
	components: { QuestionListCard, EmptyState, PageLoading },
	setup () {
		const {
			filteredQuestions: questions, error, loading, hasMore,
			answeredChoices, answered, subjectId, fetchOlderQuestions
		} = useQuestionList()

		return {
			questions, error, loading, hasMore,
			answeredChoices, answered, subjectId,
			fetchOlderQuestions
		}
	}
})
</script>
