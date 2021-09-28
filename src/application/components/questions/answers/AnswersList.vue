<template>
	<div class="d-flex flex-column gap-1">
		<Heading v-if="answers.length > 0" variant="2">
			Answers
		</Heading>
		<AnswerCard v-for="answer in answers" :key="answer.hash" :answer="answer" :question="question" />
		<div v-if="!loading && !error && answers.length === 0" class="bg-line rounded-3 p-1-5 text-center">
			<DynamicText>
				{{ question.userName }} needs your help!<br>Answer the question and earn some bronze coins.
			</DynamicText>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from '@nuxtjs/composition-api'
import { useAnswerList } from '@app/hooks/questions/answers'
import AnswerCard from '@app/components/questions/answers/AnswersListCard.vue'
import { QuestionEntity } from '@modules/questions'

export default defineComponent({
	name: 'AnswersList',
	components: { AnswerCard },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { answers, error, loading, listener } = useAnswerList(props.question.id)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			answers, error, loading
		}
	}
})
</script>
