<template>
	<div class="showcase-flex">
		<div class="flex items-center justify-between gap-2 md:p-4 border-bottom-line pb-4">
			<IonText class="leading-tight text-heading font-bold hidden md:inline">
				My questions
			</IonText>
			<div class="flex items-center gap-4 w-full md:w-auto">
				<router-link class="hidden md:inline" to="/questions/create">
					<IonButton class="btn-primary font-bold">
						Ask a question
					</IonButton>
				</router-link>
			</div>
		</div>
		<BlockLoading v-if="loading" />
		<EmptyState v-if="!loading && !error && questions.length === 0" :btnText="'Ask a question'"
			:info="'No questions found! Start asking questions to help with homework and studying.'"
			route="/questions/create"
		/>
		<QuestionListCard v-for="question in questions" :key="question.hash" :question="question"
			class="border-bottom-line" />
		<div v-if="hasMore" class="text-center py-8 text-lg text-primary w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderQuestions">Load More</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import { useUserQuestionList } from '@app/composable/users/users/questions'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'MyQuestionsList',
	components: { QuestionListCard },
	setup () {
		const { questions, error, loading, hasMore, fetchOlderQuestions } = useUserQuestionList(useAuth().id.value)
		return { questions, error, loading, hasMore, fetchOlderQuestions }
	}
})
</script>
