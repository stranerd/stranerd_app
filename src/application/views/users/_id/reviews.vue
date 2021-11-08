<template>
	<UserPageWrapper :userId="id">
		<UserReviews :userId="id" />
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import UserReviews from '@app/components/users/users/UserReviews.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'ProfileReviews',
	displayName: 'Profile',
	layout: 'users',
	components: { UserPageWrapper, UserReviews },
	setup () {
		const route = useRoute()
		const id = route.params.id
		return { id }
	}
})
</script>

<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}

</style>
