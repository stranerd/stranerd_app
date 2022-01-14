<template>
	<div class="flex flex-col">
		<CommentsListCard v-for="comment in comments" :key="comment.hash" :comment="comment" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAnswerCommentList } from '@app/composable/questions/answer-comments'
import CommentsListCard from '@app/components/questions/comments/CommentsListCard.vue'

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
		const { comments, loading, error } = useAnswerCommentList(props.answerId)
		return { comments, loading, error }
	}
})
</script>
