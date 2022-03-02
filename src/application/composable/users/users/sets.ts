import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { GetUserSets, ListenToUserSets, SetEntity } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'

const global = {} as Record<string, {
	sets: Ref<SetEntity[]>
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToSetList = (id: string, set: SetEntity) => {
	const index = global[id].sets.value.findIndex((a) => a.id === set.id)
	if (index !== -1) global[id].sets.value.splice(index, 1, set)
	else global[id].sets.value.push(set)
}

export const useUserSetList = (id: string = useAuth().id.value) => {
	if (global[id] === undefined) global[id] = {
		sets: ref([]),
		fetched: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchSets = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const sets = await GetUserSets.call(id)
			sets.results.forEach((a) => pushToSetList(id, a))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToUserSets.call(id, {
			created: async (entity) => {
				const index = global[id].sets.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].sets.value.unshift(entity)
				else global[id].sets.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = global[id].sets.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].sets.value.unshift(entity)
				else global[id].sets.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				global[id].sets.value = global[id].sets.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	const rootSets = computed(() => global[id].sets.value.filter((s) => !s.parent))

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchSets()
		await listener.startListener()
	})

	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global[id], rootSets }
}
