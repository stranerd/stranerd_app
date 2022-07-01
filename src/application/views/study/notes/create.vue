<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStudyModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudyNotesCreate',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ goBackToNonAuth }) => {
		useStudyModal().openCreateNote()
		return goBackToNonAuth()
	}])
})
</script>
