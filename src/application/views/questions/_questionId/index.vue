<template>
	<DashboardWithToolbarLayout>
		<div class="flex flex-col gap-4">
			<template v-if="question">
				<QuestionPageCard :question="question" class="border-bottom-line" />
				<AnswersList :question="question" />
			</template>
			<p v-else>Question Not Found</p>
		</div>
	</DashboardWithToolbarLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useQuestion } from '@app/composable/questions/questions'
import DashboardWithToolbarLayout from '@app/layouts/DashboardWithToolbar.vue'
import QuestionPageCard from '@app/components/questions/questions/QuestionPageCard.vue'
import AnswersList from '@app/components/questions/answers/AnswersList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'QuestionsQuestionId',
	components: {
		DashboardWithToolbarLayout,
		QuestionPageCard,
		AnswersList
	},
	setup () {
		useRouteMeta('Question')
		const { questionId } = useRoute().params
		const { error, loading, question } = useQuestion(questionId as string)
		return { error, loading, question }
	}
})
</script>
