<template>
	<DefaultLayout :ignorePagePadding="true">
		<div class="h-full lg:px-8 showcase-flex">
			<BlockLoading v-if="loading" />
			<template v-else-if="question">
				<QuestionPageCard :question="question" />
				<AnswersList v-if="isSubscribed" :question="question" />
				<UnsubscribedAnswersList v-else :question="question" />
			</template>
			<NotFound v-else title="Question Not Found" />
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
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'QuestionsQuestionId',
	components: { QuestionPageCard, AnswersList, UnsubscribedAnswersList },
	setup () {
		const { questionId } = useRoute().params
		useRouteMeta('Question', { back: true })
		const { isSubscribed } = useAuth()
		const { error, loading, question } = useQuestion(questionId as string)
		return { isSubscribed, error, loading, question }
	}
})
</script>
