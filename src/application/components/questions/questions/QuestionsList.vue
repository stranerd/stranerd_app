<template>
	<div class="text-xs md:text-sm md:px-4 flex flex-col md:gap-4 md:py-8">
		<div class="bg-white md:rounded-xl flex items-center justify-between gap-2 md:p-4">
			<ion-text class="text-main_dark leading-tight lg:text-3xl text-xl font-bold hidden md:inline">
				All questions
			</ion-text>
			<div class="flex items-center gap-4 w-full md:w-auto border-bottom-line">
				<ion-select v-model="answered"
					class="bg-white md:bg-new_gray !text-gray flex-grow w-full md:w-32 font-bold select-primary"
					interface="action-sheet"
					placeholder="State">
					<ion-select-option v-for="choice in answeredChoices" :key="choice.key"
						:value="choice.val" @click="answered = choice.val">
						{{ choice.key }}
					</ion-select-option>
				</ion-select>

				<router-link class="hidden md:inline" to="/questions/create">
					<ion-button class="btn-primary font-bold">
						Ask a question
					</ion-button>
				</router-link>
			</div>
		</div>
		<EmptyState v-if="!loading && !error && questions.length === 0" :btnText="'Ask a question'"
			:info="'No questions found! Start asking questions to help with homework and studying.'"
			route="/questions/create"
		/>
		<QuestionListCard v-for="question in questions" :key="question.hash" :question="question"
			class="border-bottom-line" />
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
import { IonSelect, IonSelectOption } from '@ionic/vue'

export default defineComponent({
	name: 'QuestionsList',
	components: { QuestionListCard, EmptyState, PageLoading, IonSelect, IonSelectOption },
	setup () {
		const {
			filteredQuestions: questions, error, loading, hasMore, fetchOlderQuestions,
			answeredChoices, answered, subject
		} = useQuestionList()

		return {
			questions, error, loading, hasMore,
			fetchOlderQuestions, answeredChoices, answered, subject
		}
	}
})
</script>
