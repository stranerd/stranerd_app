<template>
	<div>
		<ReviewCard v-for="review in reviews" :key="review.hash" :review="review" />
		<div v-if="hasMore" class="text-center py-2 text-18 text-primary-dark">
			<a @click.prevent="fetchOlderReviews">Load More</a>
		</div>
		<DisplayWarning
			v-if="!loading && !error && reviews.length === 0"
			message="This user has not received any reviews yet."
		/>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import ReviewCard from '@app/components/users/reviews/ReviewListCard.vue'
import { useUserReviewList } from '@app/hooks/users/user/reviews'

export default defineComponent({
	name: 'ReviewsList',
	components: { ReviewCard },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { reviews, error, loading, hasMore, fetchOlderReviews } = useUserReviewList(props.userId)
		return {
			reviews, error, loading, hasMore,
			fetchOlderReviews
		}
	}
})
</script>
