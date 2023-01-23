import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { QuestionEntity, QuestionsUseCases } from '@modules/questions'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'
import { useListener } from '@app/composable/core/listener'

const store = {} as Record<string, {
	questions: Ref<QuestionEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<QuestionEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserQuestionList = (id: string) => {
	if (store[id] === undefined) store[id] = {
		questions: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		searchMode: ref(false),
		searchResults: ref([]),
		searchValue: ref(''),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchQuestions = async () => {
		await store[id].setError('')
		try {
			await store[id].setLoading(true)
			const questions = await QuestionsUseCases.getUserQuestions(id, store[id].questions.value.at(-1)?.createdAt)
			store[id].hasMore.value = !!questions.pages.next
			questions.results.forEach((a) => addToArray(store[id].questions.value, a, (e) => e.id, (e) => e.createdAt))
			store[id].fetched.value = true
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await QuestionsUseCases.listenToUserQuestions(id, {
			created: async (entity) => {
				addToArray(store[id].questions.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(store[id].questions.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				store[id].questions.value = store[id].questions.value.filter((c) => c.id !== entity.id)
			}
		}, store[id].questions.value.at(-1)?.createdAt)
	})

	onMounted(async () => {
		if (!store[id].fetched.value && !store[id].loading.value) await fetchQuestions()
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
			store[id].searchResults.value = await QuestionsUseCases.searchUserQuestions(id, searchValue)
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	watch(store[id].searchValue, () => {
		if (!store[id].searchValue.value) store[id].searchMode.value = false
	})

	return { ...store[id], fetchOlderQuestions: fetchQuestions, search }
}
