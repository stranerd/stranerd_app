<template>
	<div class="showcase-flex">
		<div class="flex lg:hidden gap-[1px]">
			<IonSelect v-model="tagId" class="capitalize w-full"
				interface="action-sheet" placeholder="Associated subject">
				<IonSelectOption value="">All</IonSelectOption>
				<IonSelectOption v-for="tag in childrenTags" :key="tag.hash" :value="tag.id" class="capitalize">
					{{ tag.title }}
				</IonSelectOption>
			</IonSelect>
			<IonSelect v-model="answered"
				class="w-full" interface="action-sheet" placeholder="State">
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
import { computed, defineComponent } from 'vue'
import { useQuestionList } from '@app/composable/questions/questions'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import { useTagList } from '@app/composable/interactions/tags'

export default defineComponent({
	name: 'QuestionsList',
	components: { QuestionListCard, EmptyState },
	setup () {
		const {
			filteredQuestions: questions, error, loading, hasMore, fetchOlderQuestions,
			answeredChoices, answered, tagId
		} = useQuestionList()
		const { questionTags } = useTagList()
		const childrenTags = computed(() => questionTags.value.filter((t) => t.parent))

		return {
			questions, error, loading, hasMore, childrenTags, tagId,
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

