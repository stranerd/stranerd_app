<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'StudyTestsTestId',
	middlewares: ['isAuthenticated', async ({ to }) => `/study/tests/${to.params.testId}/take`]
})
</script>
