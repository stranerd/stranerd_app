<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEditingQuestion } from '@app/composable/questions/questions'
import { useAuth } from '@app/composable/auth/auth'
import { useQuestionModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'QuestionsQuestionIdEdit',
	displayName: 'Edit Question',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ from, to }) => {
		const { id } = useAuth()
		const { questionId = '' } = to.params
		const question = getEditingQuestion()
		if (!question || question.id !== questionId) return `/questions/${questionId}`
		const canEdit = question.user.id === id.value && question.canBeEdited
		if (!canEdit) return `/questions/${question.id}`
		useQuestionModal().openEditQuestion()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}])
})
</script>
