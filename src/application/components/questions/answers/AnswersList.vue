<template>
	<div class="flex flex-col">
		<h2 class="text-dark_gray text-sm font-bold">
			Answers<span class="text-icon_inactive">({{ question?.answers.length }})</span>
		</h2>
		<AnswersListCard v-for="answer in answers" :key="answer.hash" :answer="answer" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAnswerList } from '@app/composable/questions/answers'
import { QuestionEntity } from '@modules/questions'
import AnswersListCard from '@app/components/questions/answers/AnswersListCard.vue'

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
		const { answers } = useAnswerList(props.question.id)
		return { answers }
	}
})
</script>
