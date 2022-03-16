import { onMounted, onUnmounted, ref } from 'vue'
import { GetAllTutors, ListenToAllTutors, ToggleTutor, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'

const global = {
	tutors: ref([] as UserEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useSuccessHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	return await ListenToAllTutors.call({
		created: async (entity) => {
			addToArray(global.tutors.value, entity, (e) => e.id, (e) => e.score)
		},
		updated: async (entity) => {
			addToArray(global.tutors.value, entity, (e) => e.id, (e) => e.score)
		},
		deleted: async (entity) => {
			const index = global.tutors.value.findIndex((t) => t.id === entity.id)
			global.tutors.value.splice(index, 1)
		}
	})
})

export const useTutorsList = () => {
	const fetchTutors = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const tutors = await GetAllTutors.call()
			tutors.results.forEach((t) => addToArray(global.tutors.value, t, (e) => e.id, (e) => e.score))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	const tutorUser = async (user: UserEntity) => {
		await global.setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to toggle this user a tutor?',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await global.setLoading(true)
			try {
				await ToggleTutor.call(user.id, true)
				user.isTutor = true
				addToArray(global.tutors.value, user, (e) => e.id, (e) => e.score)
				await global.setMessage('Successfully upgraded to tutor')
			} catch (error) {
				await global.setError(error)
			}
			await global.setLoading(false)
		}
	}

	const deTutorUser = async (user: UserEntity) => {
		await global.setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to de-tutor this user?',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await global.setLoading(true)
			try {
				await ToggleTutor.call(user.id, false)
				global.tutors.value = global.tutors.value
					.filter((u) => u.id !== user.id)
				await global.setMessage('Successfully downgraded from tutor')
			} catch (error) {
				await global.setError(error)
			}
			await global.setLoading(false)
		}
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTutors()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global, tutorUser, deTutorUser }
}
