import { computed, onMounted, reactive, ref, toRefs } from 'vue'
import { GetAllTutors, GetUsersByEmail, ListenToAllTutors, MakeTutor, RemoveTutor, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@app/composable/core/notifications'
import { useAuth } from '@app/composable/auth/auth'

const global = {
	tutors: ref([] as UserEntity[]),
	fetched: ref(false),
	subjectId: ref(''),
	...useErrorHandler(),
	...useLoadingHandler()
}

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
			.sort((a, b) => a.score > b.score ? -1 : a.score === b.score ? 0 : 1)
			.filter((tutor) => {
				if (global.subjectId.value && !tutor.subjects.includes(global.subjectId.value)) return false
				return true
			}),
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

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTutors()
	})

	return { ...global, listener, filteredTutors, adminTutors }
}

export const useTutorRoles = () => {
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

	const tutorUser = async (user: UserEntity) => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to make this user a tutor?',
			text: 'This user will gain tutor privileges to the entire site',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await MakeTutor.call(user.id)
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
			text: 'This user will lose tutor privileges to the entire site',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await RemoveTutor.call(user.id)
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
		getUsersByEmail, tutorUser, deTutorUser, reset
	}
}
