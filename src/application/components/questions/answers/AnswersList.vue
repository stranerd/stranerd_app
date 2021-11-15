<template>
	<div class="flex flex-col">
		<h2 class="text-dark_gray text-sm font-bold">
<<<<<<< HEAD
			Answers<span class="text-icon_inactive">({{ question?.answers.length }})</span>
		</h2>
		<template v-if="answers.length">
			<AnswersListCard v-for="answer in answers" :key="answer.hash" :answer="answer" />
		</template>

		<empty-state
=======
			Answers<span class="text-icon_inactive">({{ question.answers.length }})</span>
		</h2>
		<template v-if="answers.length">
			<AnswersListCard v-for="answer in answers" :key="answer.hash" :answer="answer" :question="question" />
		</template>

		<empty-state v-else
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
			class="mt-4 font-bold !text-lg"
			info="This Question has no Answers yet"
		/>

	</div>
</template>

<script lang="ts">
<<<<<<< HEAD
import { defineComponent } from 'vue'
=======
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
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
<<<<<<< HEAD
		const { answers } = useAnswerList(props.question.id)
		return { answers }
=======
		const { answers, listener, error, loading } = useAnswerList(props.question.id)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { answers, error, loading }
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	}
})
</script>
