<template>
	<div>
		<PageLoading v-if="loading" />
		<CommentCard v-for="comment in comments" :key="comment.hash" :comment="comment" />
		<DisplayWarning v-if="!loading && !error && comments.length === 0" message="No comments found." />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useQuestionCommentList } from '@/application/hooks/questions/question-comments'
import CommentCard from '@app/components/questions/comments/CommentsListCard.vue'

export default defineComponent({
	name: 'QuestionCommentsList',
	components: { CommentCard },
	props: {
		questionId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { error, loading, comments, listener } = useQuestionCommentList(props.questionId)
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return {
			error, loading, comments
		}
	}
})
</script>
