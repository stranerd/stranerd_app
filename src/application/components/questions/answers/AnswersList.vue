<template>
	<div class="flex flex-col">
		<h2 class="text-main_dark text-heading font-bold px-4 md:px-0">
			Answers <span class="text-gray">({{ question.answers.length }})</span>
		</h2>
		<AnswersListCard v-for="answer in answers" :key="answer.hash" :answer="answer" :question="question" />
		<template v-if="answers.length === 0">
			<EmptyState v-if="showAnswerButton"
				:info="`No answers yet. <br/>Help ${question.userName} answer this question!`"
				class="mt-4 text-sub"
			/>

			<EmptyState v-else
				class="mt-4 text-sub"
				info="No answers yet"
			/>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { openAnswerModal, useAnswerList } from '@app/composable/questions/answers'
import { QuestionEntity } from '@modules/questions'
import AnswersListCard from '@app/components/questions/answers/AnswersListCard.vue'
import EmptyState from '../../core/EmptyState.vue'
import { useAuth } from '@app/composable/auth/auth'

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
		const { id } = useAuth()
		const { answers, error, loading } = useAnswerList(props.question.id)

		const showAnswerButton = computed({
			get: () => props.question.userId !== id.value && !props.question.isAnswered && !props.question.answers.find((a) => a.userId === id.value),
			set: () => {
			}
		})

		return {
			openAnswerModal: () => openAnswerModal(props.question),
			answers, error, loading, showAnswerButton
		}
	}
})
</script>
