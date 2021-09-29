<template>
	<div class="d-flex flex-column gap-2">
		<PageLoading v-if="loading" />
		<div class="d-flex flex-column">
			<QuestionPageCard v-if="question" :key="question.hash" :question="question" />
			<DisplayError v-else error="No such question found!" />
			<DisplayError :error="error" />
		</div>
		<template v-if="question">
			<AnswersList id="answers" :question="question" />
			<QuestionsList :question="question" />
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import QuestionPageCard from '@app/components/questions/questions/QuestionPageCard.vue'
import AnswersList from '@app/components/questions/answers/AnswersList.vue'
import QuestionsList from '@app/components/questions/questions/SimilarQuestionsList.vue'
import { useQuestion } from '@/application/hooks/questions/questions'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'QuestionPage',
	components: { QuestionPageCard, AnswersList, QuestionsList },
	layout: 'justified',
	setup () {
		const { questionId } = useRoute().params
		const { error, loading, question, listener } = useQuestion(questionId[0])
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		// useMeta(() => ({
		// 	title: 'Question and Answers | Stranerd'
		// }))
		return { questionId, question, error, loading }
	},
	head: {}
})
</script>
