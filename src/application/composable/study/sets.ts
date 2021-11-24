import { computed, onMounted, Ref, ref } from 'vue'
import { AddSet, GetSets, ListenToSets, SetEntity, SetFactory } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'

const global = {
	sets: ref([] as SetEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToSetList = (set: SetEntity) => {
	const index = global.sets.value.findIndex((q) => q.id === set.id)
	if (index !== -1) global.sets.value.splice(index, 1, set)
	else global.sets.value.push(set)
}
const unshiftToSetList = (set: SetEntity) => {
	const index = global.sets.value.findIndex((q) => q.id === set.id)
	if (index !== -1) global.sets.value.splice(index, 1, set)
	else global.sets.value.unshift(set)
}

export const useSetList = () => {
	const { id } = useAuth()

	const fetchSets = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const sets = await GetSets.call(id.value)
			global.hasMore.value = !!sets.pages.next
			sets.results.forEach(pushToSetList)
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const listener = useListener(async () => {
		return await ListenToSets.call(id.value, {
			created: async (entity) => {
				unshiftToSetList(entity)
			},
			updated: async (entity) => {
				unshiftToSetList(entity)
			},
			deleted: async (entity) => {
				const index = global.sets.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.sets.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchSets()
	})

	const rootSet = computed({
		get: () => global.sets.value.find((s) => s.isRoot) ?? null,
		set: () => {
		}
	})

	return { ...global, listener, rootSet }
}

export const useCreateSet = () => {
	const factory = ref(new SetFactory()) as Ref<SetFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const createSet = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AddSet.call(factory.value)
				await setMessage('Set created successfully')
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, createSet }
}
