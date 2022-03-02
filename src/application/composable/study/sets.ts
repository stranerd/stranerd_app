import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import {
	AddSet,
	DeleteSet,
	DeleteSetProp,
	EditSet,
	FindSet,
	FlashCardEntity,
	GetFlashCardsInSet,
	GetNotesInSet,
	GetSetChildren,
	GetSetsInSet,
	GetTestPrepsInSet,
	GetVideosInSet,
	ListenToFlashCardsInSet,
	ListenToNotesInSet,
	ListenToSet,
	ListenToSetChildren,
	ListenToSetsInSet,
	ListenToTestPrepsInSet,
	ListenToVideosInSet,
	NoteEntity,
	SaveSetProp,
	SetEntity,
	SetFactory,
	TestPrepEntity,
	VideoEntity
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useMenuPopover, useStudyModal } from '@app/composable/core/modals'
import { Alert, Notify } from '@utils/dialog'

type SaveKey = keyof SetEntity['saved']

const global = {} as Record<string, {
	set: Ref<SetEntity | null>
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
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useSetById = (setId: string) => {
	if (global[setId] === undefined) {
		const listener = useListener(async () => {
			return ListenToSet.call(setId, {
				created: async (entity) => {
					global[setId].set.value = entity
				},
				updated: async (entity) => {
					global[setId].set.value = entity
				},
				deleted: async () => {
					global[setId].set.value = null
				}
			})
		})
		global[setId] = {
			set: ref(null),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchSet = async () => {
		await global[setId].setError('')
		try {
			await global[setId].setLoading(true)
			global[setId].set.value = await FindSet.call(setId)
		} catch (error) {
			await global[setId].setError(error)
		}
		await global[setId].setLoading(false)
	}

	onMounted(async () => {
		if (!global[setId].fetched.value && !global[setId].loading.value) await fetchSet()
		await global[setId].listener.startListener()
	})
	onUnmounted(async () => {
		await global[setId].listener.closeListener()
	})

	return { ...global[setId] }
}

export const useSet = (set: SetEntity) => {
	if (setGlobal[set.id] === undefined) {
		const listener = useListener(async () => {
			const listeners = await Promise.all([
				ListenToNotesInSet.call(set.saved.notes, {
					created: async (entity) => {
						const index = setGlobal[set.id].notes.value.findIndex((q) => q.id === entity.id)
						if (index !== -1) setGlobal[set.id].notes.value.splice(index, 1, entity)
						else setGlobal[set.id].notes.value.push(entity)
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
						const index = setGlobal[set.id].videos.value.findIndex((q) => q.id === entity.id)
						if (index !== -1) setGlobal[set.id].videos.value.splice(index, 1, entity)
						else setGlobal[set.id].videos.value.push(entity)
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
						const index = setGlobal[set.id].flashCards.value.findIndex((q) => q.id === entity.id)
						if (index !== -1) setGlobal[set.id].flashCards.value.splice(index, 1, entity)
						else setGlobal[set.id].flashCards.value.push(entity)
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
						const index = setGlobal[set.id].testPreps.value.findIndex((q) => q.id === entity.id)
						if (index !== -1) setGlobal[set.id].testPreps.value.splice(index, 1, entity)
						else setGlobal[set.id].testPreps.value.push(entity)
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
				ListenToSetsInSet.call(set.saved.sets, {
					created: async (entity) => {
						const index = setGlobal[set.id].sets.value.findIndex((q) => q.id === entity.id)
						if (index !== -1) setGlobal[set.id].sets.value.splice(index, 1, entity)
						else setGlobal[set.id].sets.value.push(entity)
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
				}),
				ListenToSetChildren.call(set.id, {
					created: async (entity) => {
						const index = setGlobal[set.id].sets.value.findIndex((q) => q.id === entity.id)
						if (index !== -1) setGlobal[set.id].sets.value.splice(index, 1, entity)
						else setGlobal[set.id].sets.value.push(entity)
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
		setGlobal[set.id] = {
			notes: ref([]),
			videos: ref([]),
			flashCards: ref([]),
			testPreps: ref([]),
			sets: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchAllSetEntities = async () => {
		await setGlobal[set.id].setError('')
		try {
			await setGlobal[set.id].setLoading(true)
			const [notes, videos, flashCards, testPreps, sets, children] = await Promise.all([
				GetNotesInSet.call(set.saved.notes), GetVideosInSet.call(set.saved.videos),
				GetFlashCardsInSet.call(set.saved.flashCards), GetTestPrepsInSet.call(set.saved.testPreps),
				GetSetsInSet.call(set.saved.sets), GetSetChildren.call(set.id)
			])
			setGlobal[set.id].notes.value = notes.results
			setGlobal[set.id].videos.value = videos.results
			setGlobal[set.id].flashCards.value = flashCards.results
			setGlobal[set.id].testPreps.value = testPreps.results
			setGlobal[set.id].sets.value = sets.results.concat(children.results)
			setGlobal[set.id].fetched.value = true
		} catch (error) {
			await setGlobal[set.id].setError(error)
		}
		await setGlobal[set.id].setLoading(false)
	}

	onMounted(async () => {
		if (!setGlobal[set.id].fetched.value && !setGlobal[set.id].loading.value) await fetchAllSetEntities()
		await setGlobal[set.id].listener.startListener()
	})
	onUnmounted(async () => {
		await setGlobal[set.id].listener.closeListener()
	})

	const notes = computed(() => setGlobal[set.id].notes.value.filter((note) => set.saved.notes.includes(note.id)))
	const videos = computed(() => setGlobal[set.id].videos.value.filter((video) => set.saved.videos.includes(video.id)))
	const flashCards = computed(() => setGlobal[set.id].flashCards.value.filter((flashCard) => set.saved.flashCards.includes(flashCard.id)))
	const testPreps = computed(() => setGlobal[set.id].testPreps.value.filter((testPrep) => set.saved.testPreps.includes(testPrep.id)))
	const sets = computed(() => setGlobal[set.id].sets.value.filter((s) => set.saved.sets.includes(s.id) || set.children.includes(s.id)))
	const children = computed(() => setGlobal[set.id].sets.value.filter((s) => set.children.includes(s.id)))

	return {
		...setGlobal[set.id], fetchAllSetEntities,
		notes, videos, flashCards, testPreps, sets, children
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
			await Notify({ title: 'Saved to folder successfully' })
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
			await Notify({ title: 'Removed from folder successfully' })
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
				await setMessage('Folder created successfully')
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

let editingSet = null as SetEntity | null
export const getEditingSet = () => editingSet
export const openSetEditModal = (set: SetEntity) => {
	editingSet = set
	useStudyModal().openEditSet()
}
export const useEditSet = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new SetFactory()) as Ref<SetFactory>
	if (editingSet) factory.value.loadEntity(editingSet)

	const editSet = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await EditSet.call(editingSet!.id, factory.value)
				await setMessage('Folder updated successfully')
				useStudyModal().closeEditSet()
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editSet }
}

export const useDeleteSet = (setId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteSet = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this folder?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteSet.call(setId)
				await setMessage('Folder deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteSet }
}

