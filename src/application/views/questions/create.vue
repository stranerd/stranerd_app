<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuestionModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'QuestionsCreate',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ from }) => {
		useQuestionModal().openCreateQuestion()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}])
})
</script>
