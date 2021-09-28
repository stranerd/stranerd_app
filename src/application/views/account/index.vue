<template>
	<div />
</template>

<script lang="ts">
// import { useAuth } from '@/application/hooks/auth/auth'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AccountIndexPage',
	middleware: [
		'isAuthenticated',
		// ({ redirect }) => redirect(`/users/${useAuth().id.value}/`)
	]
})
</script>
