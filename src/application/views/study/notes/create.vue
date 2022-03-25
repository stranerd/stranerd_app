<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'StudyNotesCreate',
	displayName: 'Create Note',
	middlewares: ['isAuthenticated', async ({ from }) => {
		useStudyModal().openCreateNote()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
