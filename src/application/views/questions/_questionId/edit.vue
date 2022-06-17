<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEditingQuestion } from '@app/composable/questions/questions'
import { useAuth } from '@app/composable/auth/auth'
import { useQuestionModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'QuestionsQuestionIdEdit',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to, goBackToNonAuth }) => {
		const { id } = useAuth()
		const { questionId = '' } = to.params
		const question = getEditingQuestion()
		if (!question || question.id !== questionId) return `/questions/${questionId}`
		const canEdit = question.user.id === id.value && question.canBeEdited
		if (!canEdit) return `/questions/${question.id}`
		useQuestionModal().openEditQuestion()
		return goBackToNonAuth()
	}]),
	setup () {
		const { questionId } = useRoute().params
		useRouteMeta('Edit Question', { back: `/questions/${questionId}` })
	}
})
</script>
