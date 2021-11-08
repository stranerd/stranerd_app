<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'account',
	middlewares: [() => {
		const { isLoggedIn, id } = useAuth()
		if (isLoggedIn.value) return `/profile/${id.value}#dashboard`
		return '/auth/signin'
	}]
})
</script>
