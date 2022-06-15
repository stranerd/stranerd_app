<template>
	<div class="flex flex-col">
		<CommentsListCard v-for="comment in comments" :key="comment.hash" :comment="comment" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommentsListCard from '@app/components/questions/comments/CommentsListCard.vue'
import { useCommentsList } from '@app/composable/interactions/comments'
import { InteractionEntities } from '@modules/interactions'

export default defineComponent({
	name: 'AnswerCommentsList',
	components: { CommentsListCard },
	props: {
		answerId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { comments, loading, error } = useCommentsList(props.answerId, InteractionEntities.answers)
		return { comments, loading, error }
	}
})
</script>
