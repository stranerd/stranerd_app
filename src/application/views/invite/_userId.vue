<template>
	<div />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { setReferrerId } from '@/application/hooks/auth/signin'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
	name: 'InviteUserPage',
	layout: 'auth',
	middleware: [
		'isNotAuthenticated'
	],
	setup () {
		const route = useRoute()
		const router = useRouter()
		onMounted(() => {
			// setReferrerId(route.params.userId)
			router.replace('/auth/signup')
		})
	}
})
</script>
