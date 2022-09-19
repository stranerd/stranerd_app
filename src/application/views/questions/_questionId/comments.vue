<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="flex flex-col flex-grow">
			<BlockLoading v-if="loading" />
			<template v-else-if="question">
				<QuestionPageCard :question="question" class="border-bottom-line" />
				<CommentsList :id="question.id" :type="InteractionEntities.questions" />
				<CommentForm :id="question.id" :type="InteractionEntities.questions"
					class="fixed bottom-0 inset-x-0 card-padding text-sm" />
			</template>
			<EmptyState v-else info="Question Not Found" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import QuestionPageCard from '@app/components/questions/questions/QuestionPageCard.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { InteractionEntities } from '@modules/interactions'
import CommentsList from '@app/components/interactions/comments/CommentsList.vue'
import CommentForm from '@app/components/interactions/comments/CommentForm.vue'
import { useQuestion } from '@app/composable/questions/questions'

export default defineComponent({
	name: 'QuestionsQuestionIdComments',
	components: { QuestionPageCard, CommentsList, CommentForm },
	setup () {
		const { questionId } = useRoute().params
		useRouteMeta('Comments', { back: true })
		const { error, loading, question } = useQuestion(questionId as string)
		return { error, loading, question, InteractionEntities }
	}
})
</script>
