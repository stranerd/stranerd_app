import { ref } from 'vue'
import { ConversationsUseCases } from '@modules/questions'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'

export const useConverse = () => {
	const conversations = ref([] as { question: string, answer: string }[])
	const question = ref('')
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const submit = async () => {
		await setError('')
		const currentQues = question.value
		try {
			await setLoading(true)
			const list = conversations.value.map((c) => {
				return c.answer ? [c.question, c.answer] : []
			}).flat()
			list.push(currentQues)
			conversations.value.push({ question: currentQues, answer: '' })
			question.value = ''
			const result = await ConversationsUseCases.converse(list)
			conversations.value.splice(conversations.value.length - 1, 1, {
				question: currentQues, answer: result.at(-1) ?? ''
			})
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}

	return { error, loading, submit, question, conversations }
}
