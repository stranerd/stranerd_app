<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'Admin404',
	beforeRouteEnter: generateMiddlewares([async () => '/admin/users/admins'])
})
</script>
