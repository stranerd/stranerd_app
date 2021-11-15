<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserDashboard :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserDashboard from '@app/components/users/users/UserDashboard.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'UserIdDashboard',
	displayName: 'Profile',
<<<<<<< HEAD
	layout: 'justified',
=======
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	components: { UserPageWrapper, UserDashboard }
})
</script>
