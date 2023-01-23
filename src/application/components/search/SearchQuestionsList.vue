<template>
	<div class="showcase-flex !p-0">
		<EmptyState v-if="questions.length === 0" info="No questions found." />
		<QuestionListCard v-for="question in questions" :key="question.hash" :question="question" />
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import { QuestionEntity } from '@modules/questions'

defineProps({
	questions: {
		type: Array as PropType<QuestionEntity[]>,
		required: true
	}
})
</script>
