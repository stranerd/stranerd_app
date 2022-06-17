<template>
	<div class="flex flex-col">
		<h2 v-if="answers.length" class="text-xl font-bold p-4 flex items-center">
			<span>Answers</span>
			<span :style="`width: ${question.answers.length.toString().length + 2}ch;`"
				class="text-primaryText bg-primaryBg text-sm rounded-full ml-auto aspect-square flex items-center justify-center">
				<span>{{ formatNumber(question.answers.length) }}</span>
			</span>
		</h2>
		<AnswersListCard v-for="answer in answers" :key="answer.hash" :answer="answer" :like="likes[answer.id]"
			:question="question" />
		<EmptyState v-if="answers.length === 0" info="No answers yet" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAnswerList } from '@app/composable/questions/answers'
import { QuestionEntity } from '@modules/questions'
import AnswersListCard from '@app/components/questions/answers/AnswersListCard.vue'
import { formatNumber } from '@utils/commons'

export default defineComponent({
	name: 'AnswersList',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: { AnswersListCard },
	setup (props) {
		const { answers, likes, error, loading } = useAnswerList(props.question.id)
		return { answers, likes, error, loading, formatNumber }
	}
})
</script>
