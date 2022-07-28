<template>
	<DefaultLayout>
		<template v-slot:panel>
			<QuestionsPanel />
		</template>
		<div class="flex flex-col lg:gap-8">
			<BlockLoading v-if="loading" />
			<template v-else-if="question">
				<QuestionPageCard :question="question" class="border-bottom-line" />
				<AnswersList v-if="wallet?.subscription.active" :question="question" />
				<UnsubscribedAnswersList v-else :question="question" />
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
import UnsubscribedAnswersList from '@app/components/questions/answers/UnsubscribedAnswersList.vue'
import { useRouteMeta } from '@app/composable/core/states'
import QuestionsPanel from '@app/components/layout/panels/QuestionsPanel.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'QuestionsQuestionId',
	components: { QuestionPageCard, AnswersList, UnsubscribedAnswersList, QuestionsPanel },
	setup () {
		const { questionId } = useRoute().params
		useRouteMeta('Question', { back: true })
		const { wallet } = useAuth()
		const { error, loading, question } = useQuestion(questionId as string)
		return { wallet, error, loading, question }
	}
})
</script>
