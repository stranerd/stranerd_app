<template>
	<UserPageWrapper :userId="id">
		<Reviews :userId="id" />
	</UserPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import Reviews from '@app/components/profile/reviews.vue'
import UserPageWrapper from '@app/components/users/users/UserPageWrapper.vue'

export default defineComponent({
	name: 'ProfileReviews',
	displayName: 'Profile',
	layout: 'users',
	components: { UserPageWrapper, Reviews },
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
