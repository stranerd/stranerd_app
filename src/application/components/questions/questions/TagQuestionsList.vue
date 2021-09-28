<template>
	<div>
		<div class="d-flex">
			<Tag :tag="tagId" class="tag mx-auto mx-lg-0" />
		</div>
		<QuestionCard v-for="question in questions" :key="question.hash" :question="question" />
		<div v-if="hasMore" class="text-center py-2 text-18 text-primary-dark">
			<a @click.prevent="fetchOlderQuestions">Load More</a>
		</div>
		<DisplayWarning
			v-if="!loading && !error && questions.length === 0"
			message="No questions found for this tag."
		/>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionCard from '@app/components/questions/questions/TagQuestionsListCard.vue'
import Tag from '@app/components/questions/tags/Tag.vue'
import { useTagQuestionList } from '@/application/hooks/questions/tag-questions'

export default defineComponent({
	name: 'TagQuestionsList',
	components: { QuestionCard, Tag },
	props: {
		tagId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const {
			filteredQuestions: questions, subjectId, error, loading, hasMore,
			answered, answeredChoices, fetchOlderQuestions
		} = useTagQuestionList(props.tagId)
		return {
			questions, error, loading, hasMore, subjectId,
			answeredChoices, answered,
			fetchOlderQuestions
		}
	}
})
</script>

<style lang="scss" scoped>
	.tag {
		display: inline-block;
		font-size: 1.5rem;
		margin-bottom: 2rem;
		@media (min-width: $md) {
			font-size: 2.25rem;
		}
	}
</style>
