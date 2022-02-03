import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import {
	AddSet,
	DeleteSetProp,
	FindSet,
	FlashCardEntity,
	GetFlashCardsInSet,
	GetNotesInSet,
	GetSetChildren,
	GetTestPrepsInSet,
	GetUserRootSet,
	GetVideosInSet,
	ListenToFlashCardsInSet,
	ListenToNotesInSet,
	ListenToSet,
	ListenToSetChildren,
	ListenToTestPrepsInSet,
	ListenToUserRootSet,
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
import { Notify } from '@utils/dialog'

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
	sets: Ref<SetEntity[]>
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

export const useUserRootSet = (userId = useAuth().id.value) => {
	userId = userId ?? ''

	if (myGlobal[userId] === undefined) {
		const listener = useListener(async () => {
			if (!userId) return () => {
			}
			return await ListenToUserRootSet.call(userId, {
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
			const sets = await GetUserRootSet.call(userId)
			sets.results.forEach((entity) => pushToMyGlobalSetList(userId, entity))
			myGlobal[userId].fetched.value = true
		} catch (error) {
			await myGlobal[userId].setError(error)
		}
		await myGlobal[userId].setLoading(false)
	}

	if (!myGlobal[userId].fetched.value && !myGlobal[userId].loading.value) fetchSets().then()

	onMounted(async () => {
		await myGlobal[userId].listener.startListener()
	})
	onUnmounted(async () => {
		// await myGlobal[userId].listener.closeListener()
	})

	const rootSet = computed(() => myGlobal[userId].sets.value[0] ?? null)

	return { ...myGlobal[userId], rootSet }
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
				const index = global.sets.value.findIndex((q) => q.id === entity.id)
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

	onMounted(async () => {
		await fetchSet()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { error, loading, set }
}

export const useSet = (set: SetEntity) => {
	if (setGlobal[set.id] === undefined) setGlobal[set.id] = {
		notes: ref([]),
		videos: ref([]),
		flashCards: ref([]),
		testPreps: ref([]),
		sets: ref([]),
		fetched: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchAllSetEntities = async () => {
		await setGlobal[set.id].setError('')
		try {
			await setGlobal[set.id].setLoading(true)
			const [notes, videos, flashCards, testPreps, sets] = await Promise.all([
				GetNotesInSet.call(set.saved.notes), GetVideosInSet.call(set.saved.videos),
				GetFlashCardsInSet.call(set.saved.flashCards), GetTestPrepsInSet.call(set.saved.testPreps),
				GetSetChildren.call(set.id)
			])
			setGlobal[set.id].notes.value = notes.results
			setGlobal[set.id].videos.value = videos.results
			setGlobal[set.id].flashCards.value = flashCards.results
			setGlobal[set.id].testPreps.value = testPreps.results
			setGlobal[set.id].sets.value = sets.results
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
			}),
			ListenToSetChildren.call(set.id, {
				created: async (entity) => {
					setGlobal[set.id].sets.value.push(entity)
				},
				updated: async (entity) => {
					const index = setGlobal[set.id].sets.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].sets.value.splice(index, 1, entity)
					else setGlobal[set.id].sets.value.push(entity)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].sets.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].sets.value.splice(index, 1)
				}
			})
		])
		return async () => {
			await Promise.all(listeners.map(((listener) => listener())))
		}
	})

	onMounted(async () => {
		if (!setGlobal[set.id].fetched.value && !setGlobal[set.id].loading.value) await fetchAllSetEntities()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	const notes = computed(() => setGlobal[set.id].notes.value.filter((note) => set.saved.notes.includes(note.id)))
	const videos = computed(() => setGlobal[set.id].videos.value.filter((video) => set.saved.videos.includes(video.id)))
	const flashCards = computed(() => setGlobal[set.id].flashCards.value.filter((flashCard) => set.saved.flashCards.includes(flashCard.id)))
	const testPreps = computed(() => setGlobal[set.id].testPreps.value.filter((testPrep) => set.saved.testPreps.includes(testPrep.id)))
	const sets = computed(() => setGlobal[set.id].sets.value.filter((s) => set.children.includes(s.id)))

	return {
		...setGlobal[set.id], fetchAllSetEntities,
		notes, videos, flashCards, testPreps, sets
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
			await Notify({ title: 'Saved to set successfully' })
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	const removeFromSet = async (prop: SaveKey, itemId: string, set: SetEntity) => {
		try {
			await setLoading(true)
			await DeleteSetProp.call(set.id, prop, [itemId])
			//@ts-ignore
			if (setGlobal[set.id]) setGlobal[set.id][prop].value = setGlobal[set.id][prop].value.filter((item) => item.id !== itemId)
			useMenuPopover().closeStudyEntityMenu()
			await Notify({ title: 'Removed from set successfully' })
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	return { loading, error, saveToSet, removeFromSet }
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
