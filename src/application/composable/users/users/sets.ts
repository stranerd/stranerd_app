import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { GetUserSets, ListenToUserSets, SetEntity } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	sets: Ref<SetEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserSetList = (id: string = useAuth().id.value) => {
	if (global[id] === undefined) {
		const listener = useListener(async () => {
			return await ListenToUserSets.call(id, {
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
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchSets = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const sets = await GetUserSets.call(id)
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

	return { ...global[id] }
}
