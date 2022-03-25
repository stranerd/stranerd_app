<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserSets :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserSets from '@app/components/users/users/UserSets.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'UsersUserIdSets',
	displayName: 'Profile',
	components: { UserPageWrapper, UserSets }
})
</script>
