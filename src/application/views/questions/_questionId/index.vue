<template>
	<DefaultLayout>
		<div class="flex flex-col">
			<BlockLoading v-if="loading" />
			<template v-else-if="question">
				<QuestionPageCard :question="question" class="border-bottom-line" />
				<AnswersList :question="question" />
			</template>
			<EmptyState v-else info="Question Not Found" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useQuestion } from '@app/composable/questions/questions'
import QuestionPageCard from '@app/components/questions/questions/QuestionPageCard.vue'
import AnswersList from '@app/components/questions/answers/AnswersList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'QuestionsQuestionId',
	components: { QuestionPageCard, AnswersList },
	setup () {
		const { questionId } = useRoute().params
		useRouteMeta('Question', { back: '/questions' })
		const { error, loading, question } = useQuestion(questionId as string)
		return { error, loading, question }
	}
})
</script>
