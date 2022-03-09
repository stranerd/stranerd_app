import { computed, onMounted, onUnmounted, ref } from 'vue'
import { GetAllTutors, ListenToAllTutors, ToggleTutor, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'

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
			const index = global.tutors.value.findIndex((t) => t.id === entity.id)
			global.tutors.value.splice(index, 1, entity)
		},
		updated: async (entity) => {
			const index = global.tutors.value.findIndex((t) => t.id === entity.id)
			global.tutors.value.splice(index, 1, entity)
		},
		deleted: async (entity) => {
			const index = global.tutors.value.findIndex((t) => t.id === entity.id)
			global.tutors.value.splice(index, 1)
		}
	})
})

const pushToTutorsList = (tutor: UserEntity) => {
	const index = global.tutors.value.findIndex((t) => t.id === tutor.id)
	if (index !== -1) global.tutors.value.splice(index, 1, tutor)
	else global.tutors.value.push(tutor)
}

export const useTutorsList = () => {
	const fetchTutors = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const tutors = await GetAllTutors.call()
			global.tutors.value = tutors.results
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const filteredTutors = computed({
		get: () => global.tutors.value
			.sort((a, b) => b.score - a.score),
		set: (tutors) => {
			tutors?.forEach?.((t) => {
				const index = global.tutors.value.findIndex((x) => x.id === t.id)
				if (index === -1) global.tutors.value.push(t)
				else global.tutors.value.splice(index, 1, t)
			})
		}
	})

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
				pushToTutorsList(user)
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

	return { ...global, filteredTutors, tutorUser, deTutorUser }
}
