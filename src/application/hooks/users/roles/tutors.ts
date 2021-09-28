import { computed, ssrRef, useFetch } from '@nuxtjs/composition-api'
import { GetAllSessionTutors, ListenToAllSessionTutors, UserEntity } from '@modules/users'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'

const global = {
	tutors: ssrRef([] as UserEntity[]),
	fetched: ssrRef(false),
	subjectId: ssrRef(''),
	...useErrorHandler(),
	...useLoadingHandler()
}

export const useTutorsList = () => {
	const fetchTutors = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const tutors = await GetAllSessionTutors.call()
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
			}), // .slice(0, 50),
		set: (tutors) => {
			tutors?.forEach?.((t) => {
				const index = global.tutors.value.findIndex((x) => x.id === t.id)
				if (index === -1) global.tutors.value.push(t)
				else global.tutors.value.splice(index, 1, t)
			})
		}
	})
	const listener = useListener(async () => {
		return await ListenToAllSessionTutors.call({
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

	useFetch(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTutors()
	})

	return { ...global, listener, filteredTutors }
}
