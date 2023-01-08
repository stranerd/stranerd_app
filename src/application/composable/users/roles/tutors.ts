import { onMounted, onUnmounted, ref } from 'vue'
import { UserEntity, UsersUseCases } from '@modules/users'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { AuthUseCases } from '@modules/auth'
import { useListener } from '@app/composable/core/listener'

const store = {
	tutors: ref([] as UserEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useSuccessHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	return await UsersUseCases.listenToAllTutors({
		created: async (entity) => {
			addToArray(store.tutors.value, entity, (e) => e.id, (e) => e.score)
		},
		updated: async (entity) => {
			addToArray(store.tutors.value, entity, (e) => e.id, (e) => e.score)
		},
		deleted: async (entity) => {
			const index = store.tutors.value.findIndex((t) => t.id === entity.id)
			store.tutors.value.splice(index, 1)
		}
	})
})

export const useTutorsList = () => {
	const fetchTutors = async () => {
		await store.setError('')
		try {
			await store.setLoading(true)
			const tutors = await UsersUseCases.getAllTutors()
			tutors.results.forEach((t) => addToArray(store.tutors.value, t, (e) => e.id, (e) => e.score))
			store.fetched.value = true
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}

	const tutorUser = async (user: UserEntity, value: boolean) => {
		await store.setError('')
		const accepted = await Alert({
			message: `Are you sure you want to ${value ? 'upgrade this user to a tutor' : 'downgrade this user from tutor'}`,
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await store.setLoading(true)
			try {
				await AuthUseCases.updateRole(user.id, 'isStranerdTutor', value)
				user.roles.isStranerdTutor = true
				addToArray(store.tutors.value, user, (e) => e.id, (e) => e.score)
				await store.setMessage(`Successfully ${value ? 'upgraded to' : 'downgraded from'} tutor`)
			} catch (error) {
				await store.setError(error)
			}
			await store.setLoading(false)
		}
	}

	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchTutors()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...store, tutorUser }
}
