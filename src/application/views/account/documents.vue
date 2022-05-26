<template>
	<Justified>
		<UserDocuments :user="user" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'
import UserDocuments from '@app/components/users/users/UserDocuments.vue'

export default defineComponent({
	name: 'AccountDocuments',
	components: { Justified, UserDocuments },
	displayName: 'Documents',
	middlewares: ['isAuthenticated'],
	setup () {
		const { user } = useAuth()
		return { user }
	}
})
</script>
