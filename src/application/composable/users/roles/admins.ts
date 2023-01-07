import { onMounted, onUnmounted, ref } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { UserEntity, UsersUseCases } from '@modules/users'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { AuthUseCases } from '@modules/auth'

const store = {
	admins: ref([] as UserEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useSuccessHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	return await UsersUseCases.listenToAllAdmins({
		created: async (entity) => {
			addToArray(store.admins.value, entity, (e) => e.id, (e) => e.bio.fullName, true)
		},
		updated: async (entity) => {
			addToArray(store.admins.value, entity, (e) => e.id, (e) => e.bio.fullName, true)
		},
		deleted: async (entity) => {
			const index = store.admins.value.findIndex((t) => t.id === entity.id)
			store.admins.value.splice(index, 1)
		}
	})
})

export const useAdminsList = () => {
	const fetchAdmins = async () => {
		await store.setError('')
		try {
			await store.setLoading(true)
			const admins = await UsersUseCases.getAllAdmins()
			admins.results.forEach((a) => addToArray(store.admins.value, a, (e) => e.id, (e) => e.bio.fullName, true))
			store.fetched.value = true
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}

	const adminUser = async (user: UserEntity, value: boolean) => {
		await store.setError('')
		const accepted = await Alert({
			message: `Are you sure you want to ${value ? 'upgrade this user to an admin' : 'downgrade this user from admin'}`,
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await store.setLoading(true)
			try {
				await AuthUseCases.updateRole(user.id, 'isStranerdAdmin', value)
				user.roles.isStranerdAdmin = true
				addToArray(store.admins.value, user, (e) => e.id, (e) => e.bio.fullName, true)
				await store.setMessage(`Successfully ${value ? 'upgraded to' : 'downgraded from'} admin`)
			} catch (error) {
				await store.setError(error)
			}
			await store.setLoading(false)
		}
	}

	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchAdmins()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...store, adminUser }
}
