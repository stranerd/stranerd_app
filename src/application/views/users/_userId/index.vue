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
	layout: 'justified',
	components: { UserPageWrapper, UserDashboard }
})
</script>
