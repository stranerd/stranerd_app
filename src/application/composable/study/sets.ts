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
import { useMenuPopover, useStudyModal } from '@app/composable/core/modals'

type SaveKey = keyof SetEntity['saved']

const global = {
	sets: ref([] as SetEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const myGlobal = {} as Record<string, {
	sets: Ref<SetEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

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
const pushToMyGlobalSetList = (userId: string, set: SetEntity) => {
	const index = myGlobal[userId].sets.value.findIndex((q) => q.id === set.id)
	if (index !== -1) myGlobal[userId].sets.value.splice(index, 1, set)
	else myGlobal[userId].sets.value.push(set)
}
const unshiftToMyGlobalSetList = (userId: string, set: SetEntity) => {
	const index = myGlobal[userId].sets.value.findIndex((q) => q.id === set.id)
	if (index !== -1) myGlobal[userId].sets.value.splice(index, 1, set)
	else myGlobal[userId].sets.value.unshift(set)
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
	const userId = id.value

	if (myGlobal[userId] === undefined) {
		const listener = useListener(async () => {
			if (!userId) return () => {
			}
			return await ListenToUserSets.call(userId, {
				created: async (entity) => {
					unshiftToMyGlobalSetList(userId, entity)
				},
				updated: async (entity) => {
					unshiftToMyGlobalSetList(userId, entity)
				},
				deleted: async (entity) => {
					const index = myGlobal[userId].sets.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) myGlobal[userId].sets.value.splice(index, 1)
				}
			})
		})
		myGlobal[userId] = {
			sets: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchSets = async () => {
		await myGlobal[userId].setError('')
		if (!userId) return
		try {
			await myGlobal[userId].setLoading(true)
			const sets = await GetUserSets.call(userId)
			sets.results.forEach((entity) => pushToMyGlobalSetList(userId, entity))
			myGlobal[userId].fetched.value = true
		} catch (error) {
			await myGlobal[userId].setError(error)
		}
		await myGlobal[userId].setLoading(false)
	}

	onMounted(async () => {
		if (!myGlobal[userId].fetched.value && !myGlobal[userId].loading.value) await fetchSets()
	})

	const rootSet = computed({
		get: () => myGlobal[userId].sets.value.find((s) => s.isRoot) ?? null,
		set: () => {
		}
	})

	const normalSets = computed({
		get: () => myGlobal[userId].sets.value.filter((s) => !s.isRoot),
		set: () => {
		}
	})

	return { ...myGlobal[userId], rootSet, normalSets }
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
				GetFlashCardsInSet.call(set.saved.flashCards), GetTestPrepsInSet.call(set.saved.testPreps)
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

	const notes = computed(() => setGlobal[set.id].notes.value.filter((note) => set.saved.notes.includes(note.id)))
	const videos = computed(() => setGlobal[set.id].videos.value.filter((video) => set.saved.videos.includes(video.id)))
	const flashCards = computed(() => setGlobal[set.id].flashCards.value.filter((flashCard) => set.saved.flashCards.includes(flashCard.id)))
	const testPreps = computed(() => setGlobal[set.id].testPreps.value.filter((testPrep) => set.saved.testPreps.includes(testPrep.id)))

	return {
		...setGlobal[set.id],
		listener, fetchAllSetEntities,
		notes, videos, flashCards, testPreps
	}
}

export const useSaveToSet = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const saveToSet = async (prop: SaveKey, itemId: string, set: SetEntity) => {
		try {
			await setLoading(true)
			await SaveSetProp.call(set.id, prop, [itemId])
			useMenuPopover().closeStudyEntityMenu()
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	const removeFromSet = async (prop: SaveKey, itemId: string, set: SetEntity) => {
		try {
			await setLoading(true)
			await DeleteSetProp.call(set.id, prop, [itemId])
			useMenuPopover().closeStudyEntityMenu()
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
		if (setGlobal[set.id]) {
			//@ts-ignore
			setGlobal[set.id][prop].value = setGlobal[set.id][prop].value.filter((item) => item.id === itemId)
		}
	}

	return { loading, error, saveToSet, removeFromSet }
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
