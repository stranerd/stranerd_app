<template>
	<CommentForm :error="error" :factory="factory" :loading="loading" :submit="createComment" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useCreateQuestionComments } from '@app/hooks/questions/question-comments'
import CommentForm from '@app/components/questions/comments/CommentForm.vue'

export default defineComponent({
	name: 'QuestionCommentForm',
	components: { CommentForm },
	props: {
		questionId: {
			required: true,
			type: String
		}
	},
	setup (props) {
		const { loading, error, factory, createComment } = useCreateQuestionComments(props.questionId)
		return { loading, error, factory, createComment }
	}
})
</script>
