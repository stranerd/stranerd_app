<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="flex flex-col flex-grow h-full">
			<BlockLoading v-if="loading" />
			<template v-else-if="answer">
				<AnswerPageCard :answer="answer" class="border-bottom-line" />
				<CommentsList :id="answer.id" :type="InteractionEntities.answers" />
				<CommentForm :id="answer.id" :type="InteractionEntities.answers"
					class="fixed bottom-0 inset-x-0 card-padding text-sm" />
			</template>
			<NotFound v-else title="Answer Not Found" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useAnswerById } from '@app/composable/questions/answers'
import AnswerPageCard from '@app/components/questions/answers/AnswerPageCard.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { InteractionEntities } from '@modules/interactions'
import CommentsList from '@app/components/interactions/comments/CommentsList.vue'
import CommentForm from '@app/components/interactions/comments/CommentForm.vue'

export default defineComponent({
	name: 'QuestionsQuestionIdAnswersAnswerId',
	components: { AnswerPageCard, CommentsList, CommentForm },
	setup () {
		const { answerId } = useRoute().params
		useRouteMeta('Comments', { back: true })
		const { error, loading, answer } = useAnswerById(answerId as string)
		return { error, loading, answer, InteractionEntities }
	}
})
</script>
