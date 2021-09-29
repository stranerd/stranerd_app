<template>
	<CommentForm :error="error" :factory="factory" :loading="loading" :submit="createComment" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateAnswerComments } from '@/application/hooks/questions/answer-comments'
import CommentForm from '@app/components/questions/comments/CommentForm.vue'

export default defineComponent({
	name: 'AnswerCommentForm',
	components: { CommentForm },
	props: {
		answerId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { loading, error, factory, createComment } = useCreateAnswerComments(props.answerId)
		return { loading, error, factory, createComment }
	}
})
</script>
