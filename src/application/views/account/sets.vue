<template>
	<Justified>
		<UserSets :user="user" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'
import UserSets from '@app/components/users/users/UserSets.vue'

export default defineComponent({
	name: 'AccountSets',
	components: { Justified, UserSets },
	displayName: 'Saved',
	middlewares: ['isAuthenticated'],
	setup () {
		const { user } = useAuth()
		return { user }
	}
})
</script>
