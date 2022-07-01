import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { SetEntity, SetsUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	sets: Ref<SetEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<SetEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserSetList = (id: string = useAuth().id.value) => {
	if (global[id] === undefined) {
		const listener = useListener(async () => {
			return await SetsUseCases.listenToUserSets(id, {
				created: async (entity) => {
					addToArray(global[id].sets.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(global[id].sets.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					global[id].sets.value = global[id].sets.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		global[id] = {
			sets: ref([]),
			fetched: ref(false),
			listener,
			searchMode: ref(false),
			searchResults: ref([]),
			searchValue: ref(''),
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchSets = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const sets = await SetsUseCases.getUserSets(id)
			sets.results.forEach((a) => addToArray(global[id].sets.value, a, (e) => e.id, (e) => e.createdAt))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchSets()
		await global[id].listener.start()
	})

	onUnmounted(async () => {
		await global[id].listener.close()
	})

	const search = async () => {
		const searchValue = global[id].searchValue.value
		if (!searchValue) return
		global[id].searchMode.value = true
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			global[id].searchResults.value = await SetsUseCases.searchUserSets(id, searchValue)
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	watch(global[id].searchValue, () => {
		if (!global[id].searchValue.value) global[id].searchMode.value = false
	})

	return { ...global[id], search }
}
