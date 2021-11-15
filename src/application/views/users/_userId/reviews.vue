<template>
	<UserPageWrapper>
		<template v-slot:default="{ user }">
			<UserReviews :user="user" />
		</template>
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserReviews from '@app/components/users/users/UserReviews.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'UserIdReviews',
	displayName: 'Profile',
<<<<<<< HEAD
	layout: 'justified',
=======
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
	components: { UserPageWrapper, UserReviews }
})
</script>
