<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'Account',
	middlewares: [async () => {
		const { isLoggedIn, id } = useAuth()
		if (isLoggedIn.value) return `/users/${id.value}/`
		return '/auth/signin'
	}]
})
</script>
