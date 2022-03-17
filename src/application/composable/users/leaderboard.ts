import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { GetLeaderboard, RankingTimes, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray } from '@utils/commons'

export const times = Object.values(RankingTimes)
export const time = ref(RankingTimes.daily)

const global = {} as Record<RankingTimes, {
	users: Ref<UserEntity[]>,
	fetched: Ref<boolean>,
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

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
			users.results.forEach((user) => addToArray(global[key].users.value, user, (e) => e.id, (e) => e.account.rankings[key]))
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
		await global[key].listener.start()
	})
	onUnmounted(async () => {
		await global[key].listener.close()
	})

	return { ...global[key], hasNoAuthUser }
}
