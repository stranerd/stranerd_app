<template>
	<ReviewsList :user-id="userId" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ReviewsList from '@app/components/users/reviews/ReviewsList.vue'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'UserReviewsPage',
	components: { ReviewsList },
	setup () {
		const { userId } = useRoute().params
		return { userId }
	}
})
</script>
