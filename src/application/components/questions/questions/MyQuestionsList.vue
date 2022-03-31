<template>
	<div class="showcase-flex">
		<div class="bg-white md:rounded-xl flex items-center justify-between gap-2 md:p-4 border-bottom-line pb-4">
			<ion-text class="text-main_dark leading-tight text-heading font-bold hidden md:inline">
				My questions
			</ion-text>
			<div class="flex items-center gap-4 w-full md:w-auto">
				<router-link class="hidden md:inline" to="/questions/create">
					<ion-button class="btn-primary font-bold">
						Ask a question
					</ion-button>
				</router-link>
			</div>
		</div>
		<IonSkeletonText v-if="loading" animated class="h-28 rounded-xl px-4" />
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
import { IonSkeletonText } from '@ionic/vue'
import { useUserQuestionList } from '@app/composable/users/users/questions'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'MyQuestionsList',
	components: { QuestionListCard, IonSkeletonText },
	setup () {
		const { questions, error, loading, hasMore, fetchOlderQuestions } = useUserQuestionList(useAuth().id.value)
		return { questions, error, loading, hasMore, fetchOlderQuestions }
	}
})
</script>
