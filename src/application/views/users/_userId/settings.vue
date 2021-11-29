<template>
	<Justified>

		<template v-slot:default="{ user }">
			<UserSettings :user="user" />
		</template>
	</Justified>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserSettings from '@app/components/users/users/UserSettings.vue'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@root/application/layouts/Justified.vue'

export default defineComponent({
	name: 'UserIdSettings',
	displayName: 'Profile',
	middlewares: ['isAuthenticated', async ({ to }) => {
		const userId = to.params.userId
		const authId = useAuth().id.value
		if (userId !== authId) return `/users/${userId}/`
	}],
	components: {  UserSettings, Justified }
})
</script>
