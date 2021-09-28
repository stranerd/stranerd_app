<template>
	<div class="d-flex flex-column gap-1">
		<Heading variant="2">
			Similar Questions
		</Heading>
		<QuestionCard v-for="similarQuestion in questions" :key="similarQuestion.hash" :question="similarQuestion" />
		<span>
			<DisplayWarning v-if="!loading && !error && questions.length === 0" message="No other questions found." />
			<DisplayError :error="error" />
		</span>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType } from 'vue'
import QuestionCard from '@app/components/questions/questions/SimilarQuestionsListCard.vue'
import { useSimilarQuestionList } from '@/application/hooks/questions/similar-questions'
import { QuestionEntity } from '@/modules/questions'

export default defineComponent({
	name: 'SimilarQuestionsList',
	components: { QuestionCard },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { questions, error, loading } = useSimilarQuestionList(props.question)
		// TODO: Consider whether to watch similar questions
		// onMounted(listener.startListener)
		// onBeforeUnmount(listener.closeListener)
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		onMounted(() => {
		})
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		onBeforeUnmount(() => {
		})
		return { questions, error, loading }
	}
})
</script>
