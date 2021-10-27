import { ref, watch } from 'vue'
import { useErrorHandler, useLoadingHandler } from '@/application/composable/core/states'
import { Search } from '@/modules/meta'
import { AnswerEntity, QuestionEntity } from '@/modules/questions'
import { UserEntity } from '@/modules/users'

export const useSearch = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const searchTerm = ref('')
	const questionsResult = ref([] as QuestionEntity[])
	const answersResult = ref([] as AnswerEntity[])
	const usersResult = ref([] as UserEntity[])

	watch(() => searchTerm.value, async () => {
		const val = searchTerm.value.trim()
		if (!val) {
			questionsResult.value = []
			answersResult.value = []
			usersResult.value = []
			return
		}
		await setError('')
		try {
			await setLoading(true)
			const res = await Search.call(val)
			questionsResult.value = res.questions.results
			answersResult.value = res.answers.results
			usersResult.value = res.users.results
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	})

	return {
		searchTerm, error, loading,
		questionsResult, answersResult, usersResult
	}
}
