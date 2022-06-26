<template>
	<div class="showcase-flex">
		<div class="flex lg:hidden gap-[1px]">
			<IonSelect v-model="answered"
				class="w-full"
				interface="action-sheet"
				placeholder="State">
				<IonSelectOption v-for="choice in answeredChoices" :key="choice.key"
					:value="choice.val" @click="answered = choice.val">
					{{ choice.key }}
				</IonSelectOption>
			</IonSelect>
			<IonSelect v-model="answered"
				class="w-full"
				interface="action-sheet"
				placeholder="State">
				<IonSelectOption v-for="choice in answeredChoices" :key="choice.key"
					:value="choice.val" @click="answered = choice.val">
					{{ choice.key }}
				</IonSelectOption>
			</IonSelect>
		</div>
		<EmptyState v-if="!loading && !error && questions.length === 0" class="border-bottom-line"
			info="There are no questions available." />
		<QuestionListCard v-for="question in questions" :key="question.hash" :question="question"
			class="border-bottom-line" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore" :load="fetchOlderQuestions" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuestionList } from '@app/composable/questions/questions'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'

export default defineComponent({
	name: 'QuestionsList',
	components: { QuestionListCard, EmptyState },
	setup () {
		const {
			filteredQuestions: questions, error, loading, hasMore, fetchOlderQuestions,
			answeredChoices, answered
		} = useQuestionList()

		return {
			questions, error, loading, hasMore,
			fetchOlderQuestions, answeredChoices, answered
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-select {
		border-radius: 0;
	}
</style>

