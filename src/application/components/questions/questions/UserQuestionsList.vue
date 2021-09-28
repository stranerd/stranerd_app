<template>
	<div>
		<form class="d-flex justify-content-center options gap-0-75 mb-1">
			<select v-model="answered" class="form-select">
				<option v-for="choice in answeredChoices" :key="choice.val" :value="choice.val">
					{{ choice.key }}
				</option>
			</select>
			<SelectSubject :subject-id.sync="subjectId" class="p-0" />
		</form>
		<QuestionCard v-for="question in questions" :key="question.hash" :question="question" />
		<div v-if="hasMore" class="text-center py-2 text-18 text-primary-dark">
			<a @click.prevent="fetchOlderQuestions">Load More</a>
		</div>
		<DisplayWarning v-if="!loading && !error && questions.length === 0" message="No questions found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/UserQuestionsListCard.vue'
import { useUserQuestionList } from '@app/hooks/users/user/questions'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'

export default defineComponent({
	name: 'UserQuestionsList',
	components: { QuestionCard, SelectSubject },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const {
			filteredQuestions: questions, subjectId, error, loading, hasMore,
			answered, answeredChoices, fetchOlderQuestions
		} = useUserQuestionList(props.userId)
		return {
			questions, error, loading, hasMore, subjectId,
			answeredChoices, answered,
			fetchOlderQuestions
		}
	}
})
</script>

<style lang="scss" scoped>
	.options {
		& > * {
			display: inline;
			max-width: 156px;
			padding: 0.25rem;
			border: 1px solid $color-line;
			background-color: $color-tags;
			@media (min-width: $md) {
				padding: 0.5rem;
			}
		}
		@media (min-width: $lg) {
			border-bottom: 1px solid $color-line;
		}
	}
</style>
