import { computed, onMounted, onUnmounted, reactive, ref, toRefs } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { GetAllAdmins, ListenToAllAdmins, SearchUsers, ToggleAdmin, UserEntity } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'
import { Alert } from '@utils/dialog'

const global = {
	admins: ref([] as UserEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	return await ListenToAllAdmins.call({
		created: async (entity) => {
			const index = global.admins.value.findIndex((t) => t.id === entity.id)
			global.admins.value.splice(index, 1, entity)
		},
		updated: async (entity) => {
			const index = global.admins.value.findIndex((t) => t.id === entity.id)
			global.admins.value.splice(index, 1, entity)
		},
		deleted: async (entity) => {
			const index = global.admins.value.findIndex((t) => t.id === entity.id)
			global.admins.value.splice(index, 1)
		}
	})
})
const { id } = useAuth()

const pushToAdminsList = (admin: UserEntity) => {
	const index = global.admins.value.findIndex((t) => t.id === admin.id)
	if (index !== -1) global.admins.value.splice(index, 1, admin)
	else global.admins.value.push(admin)
}

export const useAdminsList = () => {
	const fetchAdmins = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const admins = await GetAllAdmins.call()
			admins.results.forEach(pushToAdminsList)
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const filteredAdmins = computed({
		get: () => global.admins.value.filter((admin) => {
			let matched = true
			if (admin.id === id.value) matched = false
			return matched
		}),
		set: (admins) => {
			admins.map(pushToAdminsList)
		}
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchAdmins()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global, filteredAdmins }
}

export const useAdminRoles = () => {
	const state = reactive({
		fetched: false,
		detail: ''
	})
	const users = ref([] as UserEntity[])
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const searchUsers = async () => {
		if (state.detail) {
			await setLoading(true)
			try {
				users.value = (await SearchUsers.call(state.detail.toLowerCase())).results
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

	const adminUser = async (user: UserEntity) => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to make this user an admin?',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await ToggleAdmin.call(user.id, true)
				user.isAdmin = true
				pushToAdminsList(user)
				reset()
				await setMessage('Successfully upgraded to admin')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	const deAdminUser = async (user: UserEntity) => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to de-admin this user?',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await ToggleAdmin.call(user.id, false)
				global.admins.value = global.admins.value
					.filter((u) => u.id !== user.id)
				await setMessage('Successfully downgraded from admin')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return {
		...toRefs(state), users, error, loading,
		searchUsers, adminUser, deAdminUser, reset
	}
}
