import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RankingTimes, UserEntity, UsersUseCases } from '@modules/users'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray } from '@utils/commons'

const store = {
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
		await store.setError('')
		try {
			await store.setLoading(true)
			const users = await UsersUseCases.getLeaderboard(store.time.value, store.tagId.value, store.nextPage.value)
			if (store.nextPage.value === 1) store.users.value = []
			users.results.forEach((user) => addToArray(store.users.value, user, (e) => e.id, (e) => e.account.rankings[store.time.value].value))
			store.nextPage.value = users.pages.next ?? 1
			store.fetched.value = true
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}
	const hasNoAuthUser = computed({
		get: () => !store.users.value.find((user) => user.id === id.value),
		set: () => {
		}
	})

	const watcher = watch([store.tagId, store.time], async () => {
		store.fetched.value = false
		await fetchUsers()
	})

	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchUsers()
	})
	onUnmounted(watcher)

	return { ...store, hasNoAuthUser, fetchMoreUsers: fetchUsers }
}
