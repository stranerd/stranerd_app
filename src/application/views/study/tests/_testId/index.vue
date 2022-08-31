<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudyTestsTestId',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => `/study/tests/${to.params.testId}/take`])
})
</script>
