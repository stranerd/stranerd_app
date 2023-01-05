import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RankingTimes, UserEntity, UsersUseCases } from '@modules/users'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray } from '@utils/commons'

const global = {
	users: ref([] as UserEntity[]),
	time: ref(RankingTimes.daily),
	tagId: ref(null as string | null),
	nextPage: ref(1),
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

export const useLeaderboardList = () => {
	const { id } = useAuth()

	const fetchUsers = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const users = await UsersUseCases.getLeaderboard(global.time.value, global.tagId.value, global.nextPage.value)
			if (global.nextPage.value === 1) global.users.value = []
			users.results.forEach((user) => addToArray(global.users.value, user, (e) => e.id, (e) => e.account.rankings[global.time.value].value))
			global.nextPage.value = users.pages.next ?? 1
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const hasNoAuthUser = computed({
		get: () => !global.users.value.find((user) => user.id === id.value),
		set: () => {
		}
	})

	const watcher = watch([global.tagId, global.time], async () => {
		global.fetched.value = false
		await fetchUsers()
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchUsers()
	})
	onUnmounted(watcher)

	return { ...global, hasNoAuthUser, fetchMoreUsers: fetchUsers }
}
