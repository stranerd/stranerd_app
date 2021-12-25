import { computed, onMounted, reactive, ref, toRefs } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { GetAllAdmins, GetUsersByEmail, ListenToAllAdmins, MakeAdmin, RemoveAdmin, UserEntity } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'
import { Alert } from '@app/composable/core/notifications'

const global = {
	admins: ref([] as UserEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
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

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchAdmins()
	})

	return { ...global, listener, filteredAdmins }
}

export const useAdminRoles = () => {
	const state = reactive({
		fetched: false,
		email: '',
		users: [] as UserEntity[]
	})
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const getUsersByEmail = async () => {
		if (state.email) {
			await setLoading(true)
			try {
				const users = await GetUsersByEmail.call(state.email.toLowerCase())
				state.users = reactive(users.results)
				state.fetched = true
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	const reset = () => {
		state.email = ''
		state.users.length = 0
		state.fetched = false
	}

	const adminUser = async (user: UserEntity) => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to make this user an admin?',
			text: 'This user will gain admin privileges to the entire site',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await MakeAdmin.call(user.id)
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
			text: 'This user will lose admin privileges to the entire site',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await RemoveAdmin.call(user.id)
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
		...toRefs(state), error, loading,
		getUsersByEmail, adminUser, deAdminUser, reset
	}
}
