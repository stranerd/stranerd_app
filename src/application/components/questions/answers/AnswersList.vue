<template>
	<div class="flex flex-col gap-4">
		<h2 class="text-lg">
			<span class="font-semibold">Answers</span> ({{ formatNumber(question.answers.length) }})
		</h2>
		<BlockLoading v-if="loading" />
		<AnswersListCard v-for="answer in answers" :key="answer.hash" :answer="answer" :like="likes[answer.id]"
			:question="question" class="lg:mb-2" />
		<EmptyAnswers v-if="answers.length === 0" />
	</div>
</template>

<script lang="ts" setup>
import { useAnswerList } from '@app/composable/questions/answers'
import { QuestionEntity } from '@modules/questions'
import AnswersListCard from '@app/components/questions/answers/AnswersListCard.vue'
import { formatNumber } from '@utils/commons'

const props = defineProps({
	question: {
		type: QuestionEntity,
		required: true
	}
})

const { answers, likes, error, loading } = useAnswerList(props.question.id)
</script>
