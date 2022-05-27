<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ClassesClassIdGroups',
	displayName: 'Groups',
	middlewares: [async ({ to }) => `/messages?classId=${to.params.classId}`]
})
</script>
