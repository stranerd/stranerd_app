<template>
	<div class="text-xs md:text-sm px-4">
		<EmptyState v-if="!loading && !error && questions.length === 0" :btnText="'Ask a question'"
			:info="'No questions found! Start asking questions to help with homework and studying.'"
			route="/questions/create"
		/>
		<div class="col-span-6 flex flex-wrap gap-4">
			<QuestionListCard v-for="question in questions" :key="question.hash" :question="question" />
		</div>
		<div v-if="hasMore" class="text-center py-8 text-lg text-primary w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderQuestions">Load More</a>
		</div>
		<page-loading v-if="loading" />
	</div>
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
