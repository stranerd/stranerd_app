import { onMounted, ref, Ref } from 'vue'
import { ReviewEntity, ReviewsUseCases } from '@modules/users'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	reviews: Ref<ReviewEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

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
			const reviews = await ReviewsUseCases.get(global[id].reviews.value.at(-1)?.createdAt)
			global[id].hasMore.value = !!reviews.pages.next
			reviews.results.forEach((a) => addToArray(global[id].reviews.value, a, (e) => e.id, (e) => e.createdAt))
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
