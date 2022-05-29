<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: '404',
	displayName: '404',
	beforeRouteEnter: generateMiddlewares([async () => '/dashboard'])
})
</script>
