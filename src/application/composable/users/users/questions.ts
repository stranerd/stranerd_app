import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { GetUserQuestions, ListenToUserQuestions, QuestionEntity } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	questions: Ref<QuestionEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserQuestionList = (id: string) => {
	if (global[id] === undefined) global[id] = {
		questions: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchQuestions = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const lastDate = global[id].questions.value[global[id].questions.value.length - 1]?.createdAt
			const questions = await GetUserQuestions.call(id, lastDate)
			global[id].hasMore.value = !!questions.pages.next
			questions.results.forEach((a) => addToArray(global[id].questions.value, a, (e) => e.id, (e) => e.createdAt))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToUserQuestions.call(id, {
			created: async (entity) => {
				addToArray(global[id].questions.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global[id].questions.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				global[id].questions.value = global[id].questions.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchQuestions()
		await listener.start()
	})

	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global[id], fetchOlderQuestions: fetchQuestions }
}
