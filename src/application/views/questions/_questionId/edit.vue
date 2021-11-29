<template>
	<DashboardWithToolbarLayout>
		<div>
			<div class="col-span-12 md:col-start-3 md:col-end-11 px-3 ">
				<div class="bg-light_gray rounded-md flex flex-row items-center">
					<router-link active-class="activeSlideTab"
						class="w-1/2 text-center inactiveSlideTab"
						to="/questions">
						All Questions
					</router-link>
					<router-link active-class="activeSlideTab"
						class="w-1/2 text-center inactiveSlideTab"
						to="/questions/create">
						Ask your question
					</router-link>
				</div>
			</div>
			<div class="text-xs md:text-sm py-6">
				<h3 class="text-center font-bold text-main_dark">
					Ask questions to help with your homework and studies.
				</h3>
				<QuestionForm
					:error="error"
					:factory="factory"
					:loading="loading"
					:submit="editQuestion"
				>
					<template v-slot:buttonText>
						Post Question
					</template>
				</QuestionForm>
			</div>
		</div>
	</DashboardWithToolbarLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardWithToolbarLayout from '@app/layouts/DashboardWithToolbar.vue'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { getEditingQuestion, useEditQuestion } from '@app/composable/questions/questions'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'QuestionIdEdit',
	displayName: 'Edit Question',
	components: { DashboardWithToolbarLayout, QuestionForm },
	middlewares: ['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { questionId = '' } = to.params
		const question = getEditingQuestion()
		if (!question || question.id !== questionId) return `/questions/${questionId}`
		const canEdit = question.userId === id.value && question.canBeEdited
		if (!canEdit) return `/questions/${question.id}`
	}],
	setup () {
		const { questionId } = useRoute().params
		const { factory, error, loading, editQuestion } = useEditQuestion(questionId as string)
		return { factory, error, loading, editQuestion }
	}
})
</script>
