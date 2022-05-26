<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'StudyDocumentsCreate',
	displayName: 'Create Document',
	middlewares: ['isAuthenticated', async ({ from }) => {
		useStudyModal().openCreateDocument()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
