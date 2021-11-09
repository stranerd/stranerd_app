import { computed, onMounted, ref } from 'vue'
import { GetLeaderboard, RankingTimes, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'

const global = {
	users: ref([] as UserEntity[]),
	Userindex: ref(0),
	RankType:  RankingTimes.daily,
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const { id } = useAuth()

const pushToUsersList = (user: UserEntity) => {
	const index = global.users.value.findIndex((t) => t.id === user.id)
	if (index !== -1) global.users.value.splice(index, 1, user)
	else global.users.value.push(user)
}

export const useLeaderboardList = () => {
	const fetchUsers = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const users = await GetLeaderboard.call(global.RankType)
			users.results.forEach(pushToUsersList)
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const filteredUsers = computed({
		get: () => global.users.value.filter((user, index) => {
			let matched = true
			if (user.id === id.value) {
				global.Userindex.value = index
				return matched = false
			}
			return matched
		}),
		set: (users) => {
			users.map(pushToUsersList)
		}
	})
	const ShortenedfilteredUsers = computed({
		get: () => global.users.value.filter((user, index) => {
			let matched = true
			if (user.id === id.value) {
				global.Userindex.value = index
				return matched = false
			}
			return matched
		}).splice(0,5),
		set: (users) => {
			users.map(pushToUsersList)
		}
	})
	const listener = useListener(async () => () => {
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchUsers()
	})

	return { ...global, listener, filteredUsers, ShortenedfilteredUsers }
}
