import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { AnswerEntity, GetUserAnswers, ListenToUserAnswers } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'

const global = {} as Record<string, {
	answers: Ref<AnswerEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToAnswerList = (id: string, answer: AnswerEntity) => {
	const index = global[id].answers.value.findIndex((a) => a.id === answer.id)
	if (index !== -1) global[id].answers.value.splice(index, 1, answer)
	else global[id].answers.value.push(answer)
}

export const useUserAnswerList = (id: string) => {
	if (global[id] === undefined) global[id] = {
		answers: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchAnswers = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const lastDate = global[id].answers.value[global[id].answers.value.length - 1]?.createdAt
			const answers = await GetUserAnswers.call(id, lastDate)
			global[id].hasMore.value = !!answers.pages.next
			answers.results.forEach((a) => pushToAnswerList(id, a))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToUserAnswers.call(id, {
			created: async (entity) => {
				const index = global[id].answers.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].answers.value.unshift(entity)
				else global[id].answers.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = global[id].answers.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].answers.value.unshift(entity)
				else global[id].answers.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				global[id].answers.value = global[id].answers.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchAnswers()
		await listener.startListener()
	})

	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global[id], fetchOlderAnswers: fetchAnswers }
}
