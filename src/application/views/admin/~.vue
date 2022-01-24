<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Admin404',
	displayName: 'Administration',
	middlewares: [async () => '/admin/users/admins']
})
</script>
