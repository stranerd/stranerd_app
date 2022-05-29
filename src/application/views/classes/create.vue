<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'ClassesCreate',
	displayName: 'Create Class',
	middlewares: ['isAuthenticated', 'isAccountVerified', async ({ from }) => {
		useClassModal().openCreateClass()
		const backPath = from?.fullPath ?? '/dashboard'
		return backPath.startsWith('/auth/') ? '/dashboard' : backPath
	}]
})
</script>
