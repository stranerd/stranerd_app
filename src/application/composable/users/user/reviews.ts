import { onMounted, ref, Ref } from 'vue'
import { GetReviews, ReviewEntity } from '@modules/users'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'

const global = {} as Record<string, {
	reviews: Ref<ReviewEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToReviewList = (id: string, review: ReviewEntity) => {
	const index = global[id].reviews.value.findIndex((a) => a.id === review.id)
	if (index !== -1) global[id].reviews.value.splice(index, 1, review)
	else global[id].reviews.value.push(review)
}

export const useUserReviewList = (id: string) => {
	if (!global[id]) global[id] = {
		reviews: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchReviews = async () => {
		await global[id].setError('')
		if (!id) return
		try {
			await global[id].setLoading(true)
			const lastDate = global[id].reviews.value[global[id].reviews.value.length - 1]?.createdAt
			const reviews = await GetReviews.call(id, lastDate)
			global[id].hasMore.value = !!reviews.pages.next
			reviews.results.forEach((a) => pushToReviewList(id, a))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchReviews()
	})

	return { ...global[id], fetchOlderReviews: fetchReviews }
}
