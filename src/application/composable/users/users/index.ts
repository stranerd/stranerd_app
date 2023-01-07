import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { UserEntity, UsersUseCases } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { useUserModal } from '@app/composable/core/modals'

const store = {} as Record<string, {
	user: Ref<UserEntity | null>
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUser = (userId: string) => {
	const { id, user } = useAuth()

	if (store[userId] === undefined) store[userId] = {
		user: ref(null),
		fetched: ref(false),
		...useLoadingHandler(),
		...useErrorHandler()
	}

	const fetchUser = async () => {
		await store[userId].setError('')
		try {
			await store[userId].setLoading(true)
			// Dont fetch if it is the current auth user
			// Instead get auth user details
			if (id.value && id.value === userId) store[userId].user.value = user.value
			else store[userId].user.value = await UsersUseCases.find(userId)
			store[userId].fetched.value = true
		} catch (error) {
			await store[userId].setError(error)
		}
		await store[userId].setLoading(false)
	}

	const listener = useListener(async () => {
		if (id.value && id.value === userId) {
			// Don't start a listener if it is the current auth user
			// Instead watch the auth user for changes
			watch(user, () => store[userId].user.value = user.value)
			return () => {
			}
		}
		const callback = async (user: UserEntity) => {
			store[userId].user.value = user
		}
		return await UsersUseCases.listenToOne(userId, { created: callback, updated: callback, deleted: callback })
	})

	onMounted(async () => {
		if (!store[userId].fetched.value && !store[userId].loading.value) await fetchUser()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return {
		error: store[userId].error,
		loading: store[userId].loading,
		user: store[userId].user
	}
}

let profileMenuUser = null as UserEntity | null
export const getProfileMenuUser = () => profileMenuUser
export const openProfileMenuModal = (user: UserEntity) => {
	profileMenuUser = user
	useUserModal().openProfileMenu()
}
