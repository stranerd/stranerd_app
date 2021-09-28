import { Ref, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { AnswerEntity, GetUserAnswers } from '@modules/questions'
import { useErrorHandler, useLoadingHandler } from '@app/hooks/core/states'

const global = {} as Record<string, {
	answers: Ref<AnswerEntity[]>,
	fetched: Ref<boolean>,
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToAnswerList = (id: string, answer: AnswerEntity) => {
	const index = global[id].answers.value.findIndex((a) => a.id === answer.id)
	if (index !== -1) global[id].answers.value.splice(index, 1, answer)
	else global[id].answers.value.push(answer)
}

export const useUserAnswerList = (id: string) => {
	if (!global[id]) global[id] = {
		answers: ssrRef([]),
		fetched: ssrRef(false),
		hasMore: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchAnswers = async () => {
		await global[id].setError('')
		if (!id) return
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

	useFetch(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchAnswers()
	})

	return { ...global[id], fetchOlderAnswers: fetchAnswers }
}
