<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useClassModal } from '@app/composable/core/modals'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'ClassesCreate',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', 'isAccountVerified', async ({ goBackToNonAuth }) => {
		useClassModal().openCreateClass()
		return goBackToNonAuth()
	}])
})
</script>
