<template>
	<div class="flex flex-col">
		<h2 class="text-main_dark lg:text-xl text-base font-bold">
			Answers <span class="text-gray">({{ question.answers.length }})</span>
		</h2>
		<template v-if="answers.length">
			<AnswersListCard v-for="answer in answers" :key="answer.hash" :answer="answer" :question="question" />
		</template>

		<EmptyState v-else
			:funcParams="question"
			:info="`No answers yet. <br/>Help ${question.userName} answer this question!`"
			:onClick="openAnswerModal"
			btnText="Answer it"
			class="mt-4 text-xs lg:text-base"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { openAnswerModal, useAnswerList } from '@app/composable/questions/answers'
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
		const { answers, listener, error, loading } = useAnswerList(props.question.id)

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			openAnswerModal: () => openAnswerModal(props.question),
			answers, error, loading
		}
	}
})
</script>
