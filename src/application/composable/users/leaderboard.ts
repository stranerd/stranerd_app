import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { GetLeaderboard, RankingTimes, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'

export const times = Object.values(RankingTimes)
export const time = ref(RankingTimes.daily)

const global = {} as Record<RankingTimes, {
	users: Ref<UserEntity[]>,
	fetched: Ref<boolean>,
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToUsersList = (key: RankingTimes, user: UserEntity) => {
	const index = global[key].users.value.findIndex((t) => t.id === user.id)
	if (index !== -1) global[key].users.value.splice(index, 1, user)
	else global[key].users.value.push(user)
}

export const useLeaderboardList = (key: RankingTimes) => {
	const { id } = useAuth()
	if (!global[key]) {
		const listener = useListener(async () => () => {
		})
		global[key] = {
			users: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchUsers = async () => {
		await global[key].setError('')
		try {
			await global[key].setLoading(true)
			const users = await GetLeaderboard.call(key)
			users.results.forEach((user) => pushToUsersList(key, user))
			global[key].fetched.value = true
		} catch (error) {
			await global[key].setError(error)
		}
		await global[key].setLoading(false)
	}
	const hasNoAuthUser = computed({
		get: () => !global[key].users.value.find((user) => user.id === id.value),
		set: () => {
		}
	})

	onMounted(async () => {
		if (!global[key].fetched.value && !global[key].loading.value) await fetchUsers()
		await global[key].listener.startListener()
	})
	onUnmounted(async () => {
		await global[key].listener.closeListener()
	})

	return { ...global[key], hasNoAuthUser }
}
