import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { SetEntity, SetsUseCases } from '@modules/study'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray } from '@utils/commons'
import { useListener } from '@app/composable/core/listener'

const store = {} as Record<string, {
	sets: Ref<SetEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<SetEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserSetList = (id: string = useAuth().id.value) => {
	if (store[id] === undefined) {
		const listener = useListener(async () => {
			return await SetsUseCases.listenToUserSets(id, {
				created: async (entity) => {
					addToArray(store[id].sets.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(store[id].sets.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					store[id].sets.value = store[id].sets.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		store[id] = {
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
		await store[id].setError('')
		try {
			await store[id].setLoading(true)
			const sets = await SetsUseCases.getUserSets(id)
			sets.results.forEach((a) => addToArray(store[id].sets.value, a, (e) => e.id, (e) => e.createdAt))
			store[id].fetched.value = true
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	onMounted(async () => {
		if (!store[id].fetched.value && !store[id].loading.value) await fetchSets()
		await store[id].listener.start()
	})

	onUnmounted(async () => {
		await store[id].listener.close()
	})

	const search = async () => {
		const searchValue = store[id].searchValue.value
		if (!searchValue) return
		store[id].searchMode.value = true
		await store[id].setError('')
		try {
			await store[id].setLoading(true)
			store[id].searchResults.value = await SetsUseCases.searchUserSets(id, searchValue)
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	watch(store[id].searchValue, () => {
		if (!store[id].searchValue.value) store[id].searchMode.value = false
	})

	return { ...store[id], search }
}
