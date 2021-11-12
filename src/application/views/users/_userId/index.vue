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
	name: 'ProfileDashboard',
	displayName: 'Profile',
	layout: 'justified',
	components: { UserPageWrapper, UserDashboard }
})
</script>

<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}
</style>
