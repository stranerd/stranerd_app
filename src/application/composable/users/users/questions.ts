import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { QuestionEntity, QuestionsUseCases } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	questions: Ref<QuestionEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<QuestionEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserQuestionList = (id: string) => {
	if (global[id] === undefined) global[id] = {
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
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const questions = await QuestionsUseCases.getUserQuestions(id, global[id].questions.value.at(-1)?.createdAt)
			global[id].hasMore.value = !!questions.pages.next
			questions.results.forEach((a) => addToArray(global[id].questions.value, a, (e) => e.id, (e) => e.createdAt))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await QuestionsUseCases.listenToUserQuestions(id, {
			created: async (entity) => {
				addToArray(global[id].questions.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global[id].questions.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				global[id].questions.value = global[id].questions.value.filter((c) => c.id !== entity.id)
			}
		}, global[id].questions.value.at(-1)?.createdAt)
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchQuestions()
		await listener.start()
	})

	onUnmounted(async () => {
		await listener.close()
	})

	const search = async () => {
		const searchValue = global[id].searchValue.value
		if (!searchValue) return
		global[id].searchMode.value = true
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			global[id].searchResults.value = await QuestionsUseCases.searchUserQuestions(id, searchValue)
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	watch(global[id].searchValue, () => {
		if (!global[id].searchValue.value) global[id].searchMode.value = false
	})

	return { ...global[id], fetchOlderQuestions: fetchQuestions, search }
}
