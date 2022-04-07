<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'UsersUserId',
	displayName: 'Profile',
	middlewares: [async ({ to }) => `/users/${to.params.userId}/questions`]
})
</script>
