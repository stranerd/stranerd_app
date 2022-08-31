<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'Auth404',
	beforeRouteEnter: generateMiddlewares([async () => '/auth/signin'])
})
</script>
