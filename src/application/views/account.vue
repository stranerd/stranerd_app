<template>
	<div />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'Account',
	middlewares: ['isAuthenticated', async () => `/users/${useAuth().id.value}/`]
})
</script>
