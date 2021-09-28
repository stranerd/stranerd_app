<template>
	<div>
		<div class="question-body">
			<Heading class="mb-1-25 text-dark" variant="1">
				Edit Your Question
			</Heading>

			<QuestionForm
				:coins="coins"
				:error="error"
				:factory="factory"
				:loading="loading"
				:submit="editQuestion"
			>
				<template slot="buttonText">
					Edit Question
				</template>
			</QuestionForm>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getEditingQuestion, useEditQuestion } from '@/application/hooks/questions/questions'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { analytics } from '@/modules/core'
import { useAuth } from '@/application/hooks/auth/auth'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'QuestionPageEditPage',
	components: { QuestionForm },
	middleware: [
		'isAuthenticated',
		// ({ redirect, route }) => {
		// 	const { id } = useAuth()
		// 	const { questionId = '' } = route.params
		// 	const question = getEditingQuestion()
		// 	if (!question || question.id !== questionId) return redirect(`/questions/${questionId}`)
		// 	const canEdit = question.userId === id.value && question.canBeEdited
		// 	if (!canEdit) return redirect(`/questions/${question.id}`)
		// }
	],
	setup () {
		const { questionId } = useRoute().params
		const { loading, editQuestion, factory, error, coins } = useEditQuestion(questionId[0])
		onMounted(() => {
			analytics.logEvent('edit_question_start')
		})
		// useMeta(() => ({
		// 	title: 'Edit Your Question | Stranerd'
		// }))
		return { loading, editQuestion, factory, error, coins }
	},
	head: {}
})
</script>

<style lang="scss" scoped>
	.question-body {
		@media (min-width: $lg) {
			background: $color-tags;
			border: 1px solid $color-line;
			padding: 3rem;
		}
	}
</style>
