<template>
	<div class="flex flex-col">
		<h2 class="text-dark_gray text-sm font-bold">
			Answers<span class="text-icon_inactive">({{ question?.answers.length }})</span>
		</h2>
		<template v-if="answers.length">
			<AnswersListCard v-for="answer in answers" :key="answer.hash" :answer="answer" />
		</template>

		<empty-state
			class="mt-4 font-bold !text-lg"
			info="This Question has no Answers yet"
		/>

	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAnswerList } from '@app/composable/questions/answers'
import { QuestionEntity } from '@modules/questions'
import AnswersListCard from '@app/components/questions/answers/AnswersListCard.vue'
import EmptyState from '../../core/EmptyState.vue'

export default defineComponent({
	name: 'AnswersList',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: { AnswersListCard, EmptyState },
	setup (props) {
		const { answers } = useAnswerList(props.question.id)
		return { answers }
	}
})
</script>
