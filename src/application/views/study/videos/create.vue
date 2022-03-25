<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStudyModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'StudyVideosCreate',
	displayName: 'Create Video',
	middlewares: ['isAuthenticated', async ({ from }) => {
		useStudyModal().openCreateVideo()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
