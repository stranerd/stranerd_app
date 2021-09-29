import { Ref, ssrRef, useFetch, watch } from '@nuxtjs/composition-api'
import { FindUser, ListenToUser, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'

const global = {} as Record<string, {
	user: Ref<UserEntity | null>;
	fetched: Ref<boolean>;
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUser = (userId: string) => {
	const { id, user } = useAuth()

	if (global[userId] === undefined) global[userId] = {
		user: ssrRef(null),
		fetched: ssrRef(false),
		...useLoadingHandler(),
		...useErrorHandler()
	}

	const fetchUser = async () => {
		await global[userId].setError('')
		try {
			await global[userId].setLoading(true)
			// Dont fetch if it is the current auth user
			// Instead get auth user details
			if (id.value && id.value === userId) global[userId].user.value = user.value
			else global[userId].user.value = await FindUser.call(userId)
			global[userId].fetched.value = true
		} catch (error) {
			await global[userId].setError(error)
		}
		await global[userId].setLoading(false)
	}

	useFetch(async () => {
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchUser()
	})

	const listener = useListener(async () => {
		if (id.value && id.value === userId) {
			// Dont start a listener if it is the current auth user
			// Instead watch the auth user for changes
			watch(() => user.value?.hash, () => global[userId].user.value = user.value)
			return () => {
			}
		}
		const callback = async (user: UserEntity) => {
			global[userId].user.value = user
		}
		return await ListenToUser.call(userId, { created: callback, updated: callback, deleted: callback })
	})

	return {
		error: global[userId].error,
		loading: global[userId].loading,
		user: global[userId].user,
		listener
	}
}
