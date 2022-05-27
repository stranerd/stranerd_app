<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: '404',
	displayName: '404',
	middlewares: [async () => '/dashboard']
})
</script>
