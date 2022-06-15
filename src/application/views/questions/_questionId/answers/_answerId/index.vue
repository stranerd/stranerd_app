<template>
	<DashboardWithToolbarLayout>
		<div class="flex flex-col flex-grow">
			<BlockLoading v-if="loading" />
			<template v-else-if="answer">
				<AnswerPageCard :answer="answer" class="border-bottom-line" />
				<CommentsList :id="answer.id" :type="InteractionEntities.answers" />
			</template>
			<EmptyState v-else info="Answer Not Found" />
		</div>
	</DashboardWithToolbarLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useAnswerById } from '@app/composable/questions/answers'
import DashboardWithToolbarLayout from '@app/layouts/DashboardWithToolbar.vue'
import AnswerPageCard from '@app/components/questions/answers/AnswerPageCard.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { InteractionEntities } from '@modules/interactions'
import CommentsList from '@app/components/interactions/comments/CommentsList.vue'

export default defineComponent({
	name: 'QuestionsQuestionIdAnswersAnswerId',
	components: {
		DashboardWithToolbarLayout,
		AnswerPageCard,
		CommentsList
	},
	setup () {
		const { questionId, answerId } = useRoute().params
		useRouteMeta('Comments', { back: `/questions/${questionId}` })
		const { error, loading, answer } = useAnswerById(answerId as string)
		return { error, loading, answer, InteractionEntities }
	}
})
</script>
