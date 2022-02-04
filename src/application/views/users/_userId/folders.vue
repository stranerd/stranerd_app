<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserFolders :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue' 
import UserFolders from '@app/components/users/users/UserFolders.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'UsersUserIdFolder',
	displayName: 'Profile',
	components: { UserPageWrapper, UserFolders }
})
</script>
