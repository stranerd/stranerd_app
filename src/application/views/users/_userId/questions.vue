<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserQuestions :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserQuestions from '@app/components/users/users/UserQuestions.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'UserIdQuestions',
	displayName: 'Profile',
<<<<<<< HEAD
	layout: 'justified',
=======
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	components: { UserPageWrapper, UserQuestions }
})
</script>
