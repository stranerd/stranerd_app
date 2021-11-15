<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserAnswers :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserAnswers from '@app/components/users/users/UserAnswers.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'UserIdAnswers',
	displayName: 'Profile',
<<<<<<< HEAD
	layout: 'justified',
=======
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	components: { UserPageWrapper, UserAnswers }
})
</script>
