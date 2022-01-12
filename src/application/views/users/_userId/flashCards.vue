<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserFlashCards :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserFlashCards from '@app/components/users/users/UserFlashCards.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'UserIdFlashCards',
	displayName: 'Profile',
	components: { UserPageWrapper, UserFlashCards }
})
</script>
