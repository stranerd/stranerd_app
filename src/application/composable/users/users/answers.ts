import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { AnswerEntity, AnswersUseCases } from '@modules/questions'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'
import { useListener } from '@app/composable/core/listener'

const store = {} as Record<string, {
	answers: Ref<AnswerEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<AnswerEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserAnswerList = (id: string) => {
	if (store[id] === undefined) store[id] = {
		answers: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		searchMode: ref(false),
		searchResults: ref([]),
		searchValue: ref(''),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchAnswers = async () => {
		await store[id].setError('')
		try {
			await store[id].setLoading(true)
			const answers = await AnswersUseCases.getUserAnswers(id, store[id].answers.value.at(-1)?.createdAt)
			store[id].hasMore.value = !!answers.pages.next
			answers.results.forEach((a) => addToArray(store[id].answers.value, a, (e) => e.id, (e) => e.createdAt))
			store[id].fetched.value = true
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await AnswersUseCases.listenToUserAnswers(id, {
			created: async (entity) => {
				addToArray(store[id].answers.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(store[id].answers.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				store[id].answers.value = store[id].answers.value.filter((c) => c.id !== entity.id)
			}
		}, store[id].answers.value.at(-1)?.createdAt)
	})

	onMounted(async () => {
		if (!store[id].fetched.value && !store[id].loading.value) await fetchAnswers()
		await listener.start()
	})

	onUnmounted(async () => {
		await listener.close()
	})

	const search = async () => {
		const searchValue = store[id].searchValue.value
		if (!searchValue) return
		store[id].searchMode.value = true
		await store[id].setError('')
		try {
			await store[id].setLoading(true)
			store[id].searchResults.value = await AnswersUseCases.searchUserAnswers(id, searchValue)
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	watch(store[id].searchValue, () => {
		if (!store[id].searchValue.value) store[id].searchMode.value = false
	})

	return { ...store[id], fetchOlderAnswers: fetchAnswers, search }
}
