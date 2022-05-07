import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { AnswerEntity, AnswersUseCases } from '@modules/questions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	answers: Ref<AnswerEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

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
			const answers = await AnswersUseCases.getUserAnswers(id, lastDate)
			global[id].hasMore.value = !!answers.pages.next
			answers.results.forEach((a) => addToArray(global[id].answers.value, a, (e) => e.id, (e) => e.createdAt))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await AnswersUseCases.listenToUserAnswers(id, {
			created: async (entity) => {
				addToArray(global[id].answers.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global[id].answers.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				global[id].answers.value = global[id].answers.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchAnswers()
		await listener.start()
	})

	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global[id], fetchOlderAnswers: fetchAnswers }
}
