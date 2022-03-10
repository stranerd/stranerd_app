<template>
	<div />
</template> 

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuestionModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'QuestionsCreate',
	displayName: 'Create Question',
	middlewares: ['isAuthenticated', async ({ from }) => {
		useQuestionModal().openCreateQuestion()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
