<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ClassesClassId404',
	displayName: '404',
	middlewares: [async ({ to }) => `/classes/${to.params.classId}/`]
})
</script>
