<template>
	<div class="showcase-flex">
		<div class="px-4">
			<ion-select v-model="answered"
				class="w-full"
				interface="action-sheet"
				placeholder="State">
				<ion-select-option v-for="choice in answeredChoices" :key="choice.key"
					:value="choice.val" @click="answered = choice.val">
					{{ choice.key }}
				</ion-select-option>
			</ion-select>
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
import { useQuestionList } from '@app/composable/questions/questions'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import { IonSelect, IonSelectOption } from '@ionic/vue'

export default defineComponent({
	name: 'QuestionsList',
	components: { QuestionListCard, EmptyState, IonSelect, IonSelectOption },
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
