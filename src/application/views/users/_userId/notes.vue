<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserNotes :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserNotes from '@app/components/users/users/UserNotes.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'UsersUserIdNotes',
	displayName: 'Profile',
	components: { UserPageWrapper, UserNotes }
})
</script>
