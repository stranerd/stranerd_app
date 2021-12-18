import { computed, onMounted, Ref, ref } from 'vue'
import {
	AddSet,
	DeleteSetProp,
	FindSet,
	FlashCardEntity,
	GetFlashCardsInSet,
	GetNotesInSet,
	GetSets,
	GetTestPrepsInSet,
	GetUserSets,
	GetVideosInSet,
	ListenToFlashCardsInSet,
	ListenToNotesInSet,
	ListenToSet,
	ListenToSets,
	ListenToTestPrepsInSet,
	ListenToUserSets,
	ListenToVideosInSet,
	NoteEntity,
	SaveSetProp,
	SetEntity,
	SetFactory,
	TestPrepEntity,
	VideoEntity
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { capitalize } from '@utils/commons'
import { useStudyModal } from '@app/composable/core/modals'

type SaveKey = keyof SetEntity['saved']

const global = {
	sets: ref([] as SetEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const myGlobal = {
	sets: ref([] as SetEntity[]),
	fetched: ref(false),
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
const pushToMyGlobalSetList = (set: SetEntity) => {
	const index = myGlobal.sets.value.findIndex((q) => q.id === set.id)
	if (index !== -1) myGlobal.sets.value.splice(index, 1, set)
	else myGlobal.sets.value.push(set)
}
const unshiftToMyGlobalSetList = (set: SetEntity) => {
	const index = myGlobal.sets.value.findIndex((q) => q.id === set.id)
	if (index !== -1) myGlobal.sets.value.splice(index, 1, set)
	else myGlobal.sets.value.unshift(set)
}

export const useSetList = () => {
	const fetchSets = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const lastDate = global.sets.value[global.sets.value.length - 1]?.createdAt
			const sets = await GetSets.call(lastDate)
			global.hasMore.value = !!sets.pages.next
			sets.results.forEach(pushToSetList)
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const listener = useListener(async () => {
		const lastDate = global.sets.value[global.sets.value.length - 1]?.createdAt
		return await ListenToSets.call({
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
		}, lastDate)
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchSets()
	})

	return { ...global, listener }
}

export const useMySets = () => {
	const { id } = useAuth()

	const fetchSets = async () => {
		await myGlobal.setError('')
		try {
			await myGlobal.setLoading(true)
			const sets = await GetUserSets.call(id.value)
			sets.results.forEach(pushToMyGlobalSetList)
			myGlobal.fetched.value = true
		} catch (error) {
			await myGlobal.setError(error)
		}
		await myGlobal.setLoading(false)
	}
	const listener = useListener(async () => {
		return await ListenToUserSets.call(id.value, {
			created: async (entity) => {
				unshiftToMyGlobalSetList(entity)
			},
			updated: async (entity) => {
				unshiftToMyGlobalSetList(entity)
			},
			deleted: async (entity) => {
				const index = myGlobal.sets.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) myGlobal.sets.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		if (!myGlobal.fetched.value && !myGlobal.loading.value) await fetchSets()
	})

	const rootSet = computed({
		get: () => myGlobal.sets.value.find((s) => s.isRoot) ?? null,
		set: () => {
		}
	})

	const normalSets = computed({
		get: () => myGlobal.sets.value.filter((s) => !s.isRoot),
		set: () => {
		}
	})

	return { ...myGlobal, listener, rootSet, normalSets }
}

export const useSetById = (setId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const set = computed({
		get: () => global.sets.value.find((q) => q.id === setId) ?? null,
		set: (q) => {
			if (q) pushToSetList(q)
		}
	})

	const listener = useListener(async () => {
		return ListenToSet.call(setId, {
			created: async (entity) => {
				pushToSetList(entity)
			},
			updated: async (entity) => {
				pushToSetList(entity)
			},
			deleted: async (entity) => {
				const index = global.sets.value.findIndex((q) => q.id === setId)
				if (index > -1) global.sets.value.splice(index, 1)
			}
		})
	})

	const fetchSet = async () => {
		await setError('')
		try {
			await setLoading(true)
			let set = global.sets.value.find((q) => q.id === setId) ?? null
			if (set) {
				await setLoading(false)
				return
			}
			set = await FindSet.call(setId)
			if (set) unshiftToSetList(set)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}

	onMounted(fetchSet)

	return { error, loading, set, listener }
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

export const useSaveToSet = () => {
	const { rootSet } = useMySets()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const props = ['notes', 'videos', 'flashCards', 'testPreps'] as SaveKey[]

	const obj = Object.fromEntries(
		props.map((prop) => {
			const save = async (itemId: string, setId?: string) => {
				if (!setId) setId = rootSet.value?.id ?? ''
				try {
					await setLoading(true)
					await SaveSetProp.call(setId, prop, [itemId])
				} catch (e) {
					await setError(e)
				}
				await setLoading(false)
			}

			const remove = async (itemId: string, setId?: string) => {
				if (!setId) setId = rootSet.value?.id ?? ''
				try {
					await setLoading(true)
					await DeleteSetProp.call(setId, prop, [itemId])
				} catch (e) {
					await setError(e)
				}
				await setLoading(false)
				if (setGlobal[setId]) {
					//@ts-ignore
					setGlobal[setId][prop].value = setGlobal[setId][prop].value.filter((item) => item.id === itemId)
				}
			}

			return [[`save${capitalize(prop)}`, save], [`remove${capitalize(prop)}`, remove]]
		}).flat(1)
	) as Record<`save${Capitalize<SaveKey>}`, (itemId: string, setId?: string) => Promise<void>>
		& Record<`remove${Capitalize<SaveKey>}`, (itemId: string, setId?: string) => Promise<void>>

	return { loading, error, ...obj }
}

export const useSaveFromASet = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const setId = ref('')
	const values = ref({
		notes: [],
		videos: [],
		flashCards: [],
		testPreps: []
	} as Record<SaveKey, string[]>)

	const addProp = (prop: SaveKey, id: string) => {
		if (values.value[prop].includes(id)) return
		values.value[prop].push(id)
	}

	const removeProp = (prop: SaveKey, id: string) => {
		values.value[prop] = values.value[prop].filter((v) => v !== id)
	}

	const save = async () => {
		const promises = Object.entries(values.value).map(async ([key, values]) => {
			try {
				await setLoading(true)
				await SaveSetProp.call(setId.value, key as SaveKey, values)
			} catch (e) {
				await setError(e)
			}
			await setLoading(false)
		})
		await Promise.all(promises)
	}

	return {
		loading, error, values, setId,
		save, addProp, removeProp
	}
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
				useStudyModal().closeCreateSet()
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, createSet }
}
