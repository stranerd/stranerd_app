<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserBio :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserBio from '@app/components/users/users/UserBio.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'UserIdBio',
	displayName: 'Profile',
	layout: 'justified',
	components: { UserPageWrapper, UserBio }
})
</script>
