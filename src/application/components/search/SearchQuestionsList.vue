<template>
	<div class="showcase-flex !p-0">
		<EmptyState v-if="questions.length === 0" info="No questions found." />
		<QuestionListCard v-for="question in questions" :key="question.hash" :question="question" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import { QuestionEntity } from '@modules/questions'

export default defineComponent({
	name: 'SearchQuestionsList',
	components: { QuestionListCard },
	props: {
		questions: {
			type: Array as PropType<QuestionEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	}
})
</script>
