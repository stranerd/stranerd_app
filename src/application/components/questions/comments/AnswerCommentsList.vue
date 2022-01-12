<template>
	<div class="flex flex-col">
		<CommentsListCard v-for="comment in comments" :key="comment.hash" :comment="comment" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted } from 'vue'
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
		const { comments, listener, loading, error } = useAnswerCommentList(props.answerId)

		onMounted(listener.startListener)
		onUnmounted(listener.closeListener)

		return { comments, loading, error }
	}
})
</script>
