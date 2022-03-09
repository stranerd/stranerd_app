import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { GetClassQuestions, ListenToClassQuestions, QuestionEntity } from '@modules/questions'
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

export const useClassQuestionList = (classId: string) => {
	if (global[classId] === undefined) global[classId] = {
		questions: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchQuestions = async () => {
		await global[classId].setError('')
		try {
			await global[classId].setLoading(true)
			const lastDate = global[classId].questions.value[global[classId].questions.value.length - 1]?.createdAt
			const questions = await GetClassQuestions.call(classId, lastDate)
			global[classId].hasMore.value = !!questions.pages.next
			questions.results.forEach((a) => pushToQuestionList(classId, a))
			global[classId].fetched.value = true
		} catch (error) {
			await global[classId].setError(error)
		}
		await global[classId].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToClassQuestions.call(classId, {
			created: async (entity) => {
				const index = global[classId].questions.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[classId].questions.value.unshift(entity)
				else global[classId].questions.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = global[classId].questions.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[classId].questions.value.unshift(entity)
				else global[classId].questions.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				global[classId].questions.value = global[classId].questions.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[classId].fetched.value && !global[classId].loading.value) await fetchQuestions()
		await listener.startListener()
	})

	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global[classId], fetchOlderQuestions: fetchQuestions }
}
