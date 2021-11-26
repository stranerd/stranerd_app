import { computed, onMounted, Ref, ref } from 'vue'
import {
	AddSet,
	FlashCardEntity,
	GetFlashCardsInSet,
	GetNotesInSet,
	GetSets,
	GetTestPrepsInSet,
	GetVideosInSet,
	ListenToFlashCardsInSet,
	ListenToNotesInSet,
	ListenToSets,
	ListenToTestPrepsInSet,
	ListenToVideosInSet,
	NoteEntity,
	SetEntity,
	SetFactory,
	TestPrepEntity,
	VideoEntity
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'

const global = {
	sets: ref([] as SetEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const setGlobal = {} as Record<string, {
	notes: Ref<NoteEntity[]>
	videos: Ref<VideoEntity[]>
	flashCards: Ref<FlashCardEntity[]>
	testPreps: Ref<TestPrepEntity[]>
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

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

export const useSet = (set: SetEntity) => {
	if (setGlobal[set.id] === undefined) setGlobal[set.id] = {
		notes: ref([]),
		videos: ref([]),
		flashCards: ref([]),
		testPreps: ref([]),
		fetched: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchAllSetEntities = async () => {
		await setGlobal[set.id].setError('')
		try {
			await setGlobal[set.id].setLoading(true)
			const [notes, videos, flashCards, testPreps] = await Promise.all([
				GetNotesInSet.call(set.saved.notes), GetVideosInSet.call(set.saved.videos),
				GetFlashCardsInSet.call(set.saved.flashCards), GetTestPrepsInSet.call(set.saved.flashCards)
			])
			setGlobal[set.id].notes.value = notes.results
			setGlobal[set.id].videos.value = videos.results
			setGlobal[set.id].flashCards.value = flashCards.results
			setGlobal[set.id].testPreps.value = testPreps.results
			setGlobal[set.id].fetched.value = true
		} catch (error) {
			await setGlobal[set.id].setError(error)
		}
		await setGlobal[set.id].setLoading(false)
	}

	const listener = useListener(async () => {
		const listeners = await Promise.all([
			ListenToNotesInSet.call(set.saved.notes, {
				created: async (entity) => {
					setGlobal[set.id].notes.value.push(entity)
				},
				updated: async (entity) => {
					const index = setGlobal[set.id].notes.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].notes.value.splice(index, 1, entity)
					else setGlobal[set.id].notes.value.push(entity)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].notes.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].notes.value.splice(index, 1)
				}
			}),
			ListenToVideosInSet.call(set.saved.videos, {
				created: async (entity) => {
					setGlobal[set.id].videos.value.push(entity)
				},
				updated: async (entity) => {
					const index = setGlobal[set.id].videos.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].videos.value.splice(index, 1, entity)
					else setGlobal[set.id].videos.value.push(entity)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].videos.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].videos.value.splice(index, 1)
				}
			}),
			ListenToFlashCardsInSet.call(set.saved.flashCards, {
				created: async (entity) => {
					setGlobal[set.id].flashCards.value.push(entity)
				},
				updated: async (entity) => {
					const index = setGlobal[set.id].flashCards.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].flashCards.value.splice(index, 1, entity)
					else setGlobal[set.id].flashCards.value.push(entity)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].flashCards.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].flashCards.value.splice(index, 1)
				}
			}),
			ListenToTestPrepsInSet.call(set.saved.testPreps, {
				created: async (entity) => {
					setGlobal[set.id].testPreps.value.push(entity)
				},
				updated: async (entity) => {
					const index = setGlobal[set.id].testPreps.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].testPreps.value.splice(index, 1, entity)
					else setGlobal[set.id].testPreps.value.push(entity)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].testPreps.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].testPreps.value.splice(index, 1)
				}
			})
		])
		return async () => {
			await Promise.all(listeners.map(((listener) => listener())))
		}
	})

	onMounted(async () => {
		if (!setGlobal[set.id].fetched.value && !setGlobal[set.id].loading.value) await fetchAllSetEntities()
	})

	return { ...setGlobal[set.id], listener, fetchAllSetEntities }
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
