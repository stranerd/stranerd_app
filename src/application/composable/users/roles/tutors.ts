import { computed, onMounted, onUnmounted, reactive, ref, toRefs } from 'vue'
import { GetAllTutors, ListenToAllTutors, SearchUsers, ToggleTutor, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useAuth } from '@app/composable/auth/auth'

const global = {
	tutors: ref([] as UserEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
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
	const { id } = useAuth()
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
	const adminTutors = computed({
		get: () => global.tutors.value.filter((t) => t.id !== id.value),
		set: (tutors) => {
			tutors?.forEach?.((t) => {
				const index = global.tutors.value.findIndex((x) => x.id === t.id)
				if (index === -1) global.tutors.value.push(t)
				else global.tutors.value.splice(index, 1, t)
			})
		}
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTutors()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global, filteredTutors, adminTutors }
}

export const useTutorRoles = () => {
	const state = reactive({
		fetched: false,
		detail: '',
		users: [] as UserEntity[]
	})
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const searchUsers = async () => {
		if (state.detail) {
			await setLoading(true)
			try {
				const users = await SearchUsers.call(state.detail.toLowerCase())
				state.users = reactive(users.results)
				state.fetched = true
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	const reset = () => {
		state.detail = ''
		state.users.length = 0
		state.fetched = false
	}

	const tutorUser = async (user: UserEntity) => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to toggle this user a tutor?',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await ToggleTutor.call(user.id, true)
				user.isTutor = true
				pushToTutorsList(user)
				reset()
				await setMessage('Successfully upgraded to tutor')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	const deTutorUser = async (user: UserEntity) => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to de-tutor this user?',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await ToggleTutor.call(user.id, false)
				global.tutors.value = global.tutors.value
					.filter((u) => u.id !== user.id)
				await setMessage('Successfully downgraded from tutor')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return {
		...toRefs(state), error, loading,
		searchUsers, tutorUser, deTutorUser, reset
	}
}
