<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Auth404',
	displayName: '404',
	middlewares: [async () => '/auth/signin']
})
</script>
