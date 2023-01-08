<template>
	<div class="showcase-flex">
		<div class="flex flex-col">
			<IonText class="font-bold text-lg">Explore questions</IonText>
			<IonText class="text-secondaryText">All questions asked show up here, browse or answer</IonText>
		</div>
		<div class="flex lg:hidden">
			<SelectTag v-model:value="tagId" :allowAll="true"
				class="w-full !rounded-none !rounded-l-xl border border-itemBg" />
			<IonSelect v-model="answered"
				class="w-full !rounded-none !rounded-r-xl"
				interface="action-sheet"
				placeholder="State">
				<IonSelectOption v-for="choice in answeredChoices" :key="choice.key"
					:value="choice.val" @click="answered = choice.val">
					{{ choice.key }}
				</IonSelectOption>
			</IonSelect>
		</div>
		<EmptyState v-if="!loading && !error && questions.length === 0" info="There are no questions available." />
		<QuestionListCard v-for="question in questions" :key="question.hash" :question="question" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore" :load="fetchOlderQuestions" />
	</div>
</template>

<script lang="ts" setup>
import { useQuestionList } from '@app/composable/questions/questions'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import SelectTag from '@app/components/questions/questions/SelectTag.vue'

const {
	filteredQuestions: questions, error, loading, hasMore, fetchOlderQuestions,
	answeredChoices, answered, tagId
} = useQuestionList()
</script>
