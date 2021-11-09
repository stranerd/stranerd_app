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
	name: 'ProfileReviews',
	displayName: 'Profile',
	layout: 'users',
	components: { UserPageWrapper, UserReviews }
})
</script>

<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}
</style>
