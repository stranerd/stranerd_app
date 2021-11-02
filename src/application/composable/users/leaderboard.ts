import { computed, reactive, ref, toRefs, onMounted } from 'vue'
import {GetLeaderboard, UserEntity} from '@/modules/users'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@/application/composable/core/states'
import { useAuth } from '@/application/composable/auth/auth'

const global = {
	users: ref([] as UserEntity[]),
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
			const users = await GetLeaderboard.call('date')
 			users.results.forEach(pushToUsersList)
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const filteredUsers = computed({
		get: () => global.users.value.filter((user) => {
			let matched = true
			if (user.id === id.value) matched = false
			return matched
		}).map((user)=>{
			return user 
		}),
		set: (users) => {
			users.map(pushToUsersList)
		}
	})
	const listener = useListener(async () => () => {
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchUsers()
	})

	return { ...global, listener, filteredUsers }
}