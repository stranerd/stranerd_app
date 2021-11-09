<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserSettings :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserSettings from '@app/components/users/users/UserSettings.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ProfileSettings',
	displayName: 'Profile',
	layout: 'users',
	middlewares: ['isAuthenticated', async ({ to }) => {
		const userId = to.params.userId
		const authId = useAuth().id.value
		if (userId !== authId) return `/users/${userId}/`
	}],
	components: { UserPageWrapper, UserSettings }
})
</script>

<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}
</style>
