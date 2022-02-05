<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserVideos :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserVideos from '@app/components/users/users/UserVideos.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'UsersUserIdVideos',
	displayName: 'Profile',
	components: { UserPageWrapper, UserVideos }
})
</script>
