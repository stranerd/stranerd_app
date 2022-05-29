<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'ClassesClassId404',
	displayName: '404',
	beforeRouteEnter: generateMiddlewares([async ({ to }) => `/classes/${to.params.classId}/`])
})
</script>
