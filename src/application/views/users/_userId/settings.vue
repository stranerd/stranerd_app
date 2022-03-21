<template>
	<Justified>
		<UserSettings class="w-full lg:w-8/12 mx-auto lg:my-6 md:p-4 lg:p-0" />
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserSettings from '@app/components/users/users/UserSettings.vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'

export default defineComponent({
	name: 'UsersUserIdSettings',
	displayName: 'Profile',
	components: { UserSettings, Justified },
	middlewares: ['isAuthenticated', async ({ to }) => {
		const userId = to.params.userId
		const authId = useAuth().id.value
		if (userId !== authId) return `/users/${userId}/`
	}]
})
</script>
