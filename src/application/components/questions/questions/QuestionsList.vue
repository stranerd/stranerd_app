<template>
	<div>
		<button class=" btn btn-primary px-2 py-1 d-md-none d-none d-sm-inline w-100 mb-1" @click="askQuestion">
			Ask A Question
		</button>

		<div class="d-flex justify-content-between align-items-center gap-1 mb-1 mb-md-2 ">
			<Heading class="text-dark d-flex align-items-center flex-grow-1 d-none d-sm-inline" variant="1">
				<div class="dash me-0-5" />
				<span class="w-100 title">All Questions</span>
				<div class="dash ms-0-5" />
			</Heading>
			<button class=" btn btn-primary px-2 py-1 d-none d-md-inline" @click="askQuestion">
				Ask A Question
			</button>
		</div>

		<form class="d-flex options gap-0-5 gap-md-1-5">
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
import { defineComponent, onBeforeUnmount, onMounted } from '@nuxtjs/composition-api'
import QuestionCard from '@app/components/questions/questions/QuestionsListCard.vue'
import { useQuestionList } from '@app/hooks/questions/questions'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import { useAuth } from '@app/hooks/auth/auth'
import { useQuestionsModal } from '@app/hooks/core/modals'
import { useRedirectToAuth } from '@app/hooks/auth/session'

export default defineComponent({
	name: 'QuestionsList',
	components: { SelectSubject, QuestionCard },
	setup () {
		const {
			filteredQuestions: questions, error, loading, hasMore,
			answeredChoices, answered, subjectId,
			fetchOlderQuestions, listener
		} = useQuestionList()
		const { redirect } = useRedirectToAuth()
		const askQuestion = () => {
			if (isLoggedIn.value) useQuestionsModal().openAskQuestions()
			else redirect()
		}

		const { isLoggedIn, user } = useAuth()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			questions, error, loading, hasMore, fetchOlderQuestions,
			answeredChoices, answered, subjectId,
			user, isLoggedIn, askQuestion
		}
	}
})
</script>

<style lang="scss" scoped>
	.options {
		justify-content: center;
		@media (min-width: $md) {
			justify-content: flex-start;
			border-bottom: 1px solid $color-line;
		}

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
	}

	.title {
		text-align: center;
		@media (min-width: $md) {
			text-align: left;
		}
	}

	.dash {
		width: 100%;
		background-color: $color-line;
		border: 1px solid $color-line;
		@media (min-width: $md) {
			display: none;
		}
	}
</style>
