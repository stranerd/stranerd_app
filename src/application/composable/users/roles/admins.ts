import { onMounted, onUnmounted, ref } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { UserEntity, UsersUseCases } from '@modules/users'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { AuthUseCases } from '@modules/auth'

const global = {
	admins: ref([] as UserEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useSuccessHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	return await UsersUseCases.listenToAllAdmins({
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

export const useAdminsList = () => {
	const fetchAdmins = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const admins = await UsersUseCases.getAllAdmins()
			admins.results.forEach((a) => addToArray(global.admins.value, a, (e) => e.id, (e) => e.bio.fullName, true))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	const adminUser = async (user: UserEntity, value: boolean) => {
		await global.setError('')
		const accepted = await Alert({
			message: `Are you sure you want to ${value ? 'upgrade this user to an admin' : 'downgrade this user from admin'}`,
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await global.setLoading(true)
			try {
				await AuthUseCases.updateRole(user.id, 'isStranerdAdmin', value)
				user.roles.isStranerdAdmin = true
				addToArray(global.admins.value, user, (e) => e.id, (e) => e.bio.fullName, true)
				await global.setMessage(`Successfully ${value ? 'upgraded to' : 'downgraded from'} admin`)
			} catch (error) {
				await global.setError(error)
			}
			await global.setLoading(false)
		}
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchAdmins()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global, adminUser }
}
