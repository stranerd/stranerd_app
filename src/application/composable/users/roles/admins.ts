import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { GetAllAdmins, ListenToAllAdmins, ToggleAdmin, UserEntity } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'

const global = {
	admins: ref([] as UserEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useSuccessHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	return await ListenToAllAdmins.call({
		created: async (entity) => {
			addToArray(global.admins.value, entity, (e) => e.id, (e) => e.bio.fullName, true)
		},
		updated: async (entity) => {
			addToArray(global.admins.value, entity, (e) => e.id, (e) => e.bio.fullName, true)
		},
		deleted: async (entity) => {
			const index = global.admins.value.findIndex((t) => t.id === entity.id)
			global.admins.value.splice(index, 1)
		}
	})
})
const { id } = useAuth()

export const useAdminsList = () => {
	const fetchAdmins = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const admins = await GetAllAdmins.call()
			admins.results.forEach((a) => addToArray(global.admins.value, a, (e) => e.id, (e) => e.bio.fullName, true))
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
			admins.map((a) => addToArray(global.admins.value, a, (e) => e.id, (e) => e.bio.fullName, true))
		}
	})

	const adminUser = async (user: UserEntity) => {
		await global.setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to make this user an admin?',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await global.setLoading(true)
			try {
				await ToggleAdmin.call(user.id, true)
				user.isAdmin = true
				addToArray(global.admins.value, user, (e) => e.id, (e) => e.bio.fullName, true)
				await global.setMessage('Successfully upgraded to admin')
			} catch (error) {
				await global.setError(error)
			}
			await global.setLoading(false)
		}
	}

	const deAdminUser = async (user: UserEntity) => {
		await global.setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to de-admin this user?',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await global.setLoading(true)
			try {
				await ToggleAdmin.call(user.id, false)
				global.admins.value = global.admins.value
					.filter((u) => u.id !== user.id)
				await global.setMessage('Successfully downgraded from admin')
			} catch (error) {
				await global.setError(error)
			}
			await global.setLoading(false)
		}
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchAdmins()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global, filteredAdmins, adminUser, deAdminUser }
}
