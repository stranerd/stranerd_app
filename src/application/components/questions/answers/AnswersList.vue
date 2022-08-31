<template>
	<div class="py-6 showcase-flex">
		<h2 class="px-4 lg:p-0 pb-4">
			<span class="font-semibold">Answers</span> ({{ formatNumber(question.answers.length) }})
		</h2>
		<BlockLoading v-if="loading" />
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
