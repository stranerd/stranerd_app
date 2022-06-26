<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<template v-slot:panel>
			<QuestionsPanel />
		</template>
		<QuestionForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editQuestion"
			class="page-padding flex-grow lg:flex-grow-0"
		>
			<template v-slot:buttonText>
				Save Question
			</template>
		</QuestionForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEditingQuestion, useEditQuestion } from '@app/composable/questions/questions'
import { useAuth } from '@app/composable/auth/auth'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import QuestionsPanel from '@app/components/layout/panels/QuestionsPanel.vue'

export default defineComponent({
	name: 'QuestionsQuestionIdEdit',
	components: { QuestionForm, QuestionsPanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { questionId = '' } = to.params
		const question = getEditingQuestion()
		if (!question || question.id !== questionId) return `/questions/${questionId}`
		const canEdit = question.user.id === id.value && question.canBeEdited
		if (!canEdit) return `/questions/${question.id}`
	}]),
	setup () {
		useRouteMeta('Edit Question', { back: true })
		const { factory, error, loading, editQuestion } = useEditQuestion()
		return { factory, error, loading, editQuestion }
	}
})
</script>
