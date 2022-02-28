import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { GetUserQuestions, ListenToUserQuestions, QuestionEntity } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'

const global = {} as Record<string, {
	questions: Ref<QuestionEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToQuestionList = (id: string, question: QuestionEntity) => {
	const index = global[id].questions.value.findIndex((a) => a.id === question.id)
	if (index !== -1) global[id].questions.value.splice(index, 1, question)
	else global[id].questions.value.push(question)
}

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
			questions.results.forEach((a) => pushToQuestionList(id, a))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToUserQuestions.call(id, {
			created: async (entity) => {
				const index = global[id].questions.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].questions.value.unshift(entity)
				else global[id].questions.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = global[id].questions.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].questions.value.unshift(entity)
				else global[id].questions.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				global[id].questions.value = global[id].questions.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchQuestions()
		await listener.startListener()
	})

	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global[id], fetchOlderQuestions: fetchQuestions }
}
