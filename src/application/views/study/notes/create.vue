<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useOnboardingModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'StudyNotesCreate',
	displayName: 'Create Note',
	middlewares: ['isAuthenticated', async ({ from }) => {
		useOnboardingModal().openSetupAccount()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
