<template>
	<div class="flex flex-col">
		<h2 v-if="answers.length" class="text-heading font-bold p-4 flex items-center">
			<span>Answers</span>
			<span
				class="text-primaryText bg-primaryBg text-sub rounded-full ml-auto h-5 w-5 flex items-center justify-center">
				{{ question.answers.length }}
			</span>
		</h2>
		<AnswersListCard v-for="answer in answers" :key="answer.hash" :answer="answer" :question="question" />
		<EmptyState v-if="answers.length === 0" info="No answers yet" />
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
			get: () => props.question.user.id !== id.value && !props.question.isAnswered && !props.question.answers.find((a) => a.userId === id.value),
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
