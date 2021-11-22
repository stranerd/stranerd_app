<template>
	<div class="flex flex-col">
		<h2 class="text-main_dark text-sm font-bold">
			Answers<span class="text-icon_inactive">({{ question.answers.length }})</span>
		</h2>
		<template v-if="answers.length">
			<AnswersListCard v-for="answer in answers" :key="answer.hash" :answer="answer" :question="question" />
		</template>

		<empty-state v-else
			class="mt-4 font-bold !text-lg"
			info="This Question has no Answers yet"
		/>

	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
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
		const { answers, listener, error, loading } = useAnswerList(props.question.id)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { answers, error, loading }
	}
})
</script>
