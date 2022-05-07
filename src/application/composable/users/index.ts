import { reactive, ref, toRefs } from 'vue'
import { UserEntity, UsersUseCases } from '@modules/users'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'

export const useSearchUsers = () => {
	const state = reactive({
		fetched: false,
		detail: ''
	})
	const users = ref([] as UserEntity[])
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	const searchUsers = async () => {
		if (state.detail) {
			await setLoading(true)
			try {
				users.value = await UsersUseCases.search(state.detail.toLowerCase())
				state.fetched = true
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	const reset = () => {
		state.detail = ''
		users.value.length = 0
		state.fetched = false
	}

	return {
		...toRefs(state), users, error, loading,
		searchUsers, reset
	}
}
