import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import {
	FlashCardEntity,
	FlashCardsUseCases,
	NoteEntity,
	NotesUseCases,
	SetEntity,
	SetFactory,
	SetsUseCases,
	TestPrepEntity,
	TestPrepsUseCases,
	VideoEntity,
	VideosUseCases
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useStudyModal } from '@app/composable/core/modals'
import { Alert, Notify } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { Router } from 'vue-router'

type SaveKey = keyof SetEntity['saved']

const global = {} as Record<string, {
	set: Ref<SetEntity | null>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const setGlobal = {} as Record<string, {
	hash: Ref<string>
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
			return SetsUseCases.listenToOne(setId, {
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
			global[setId].set.value = await SetsUseCases.find(setId)
		} catch (error) {
			await global[setId].setError(error)
		}
		await global[setId].setLoading(false)
	}

	onMounted(async () => {
		if (!global[setId].fetched.value && !global[setId].loading.value) await fetchSet()
		await global[setId].listener.start()
	})
	onUnmounted(async () => {
		await global[setId].listener.close()
	})

	return { ...global[setId] }
}

export const useSet = (set: SetEntity) => {
	const listenerFn = async () => {
		const listeners = await Promise.all([
			NotesUseCases.listenInList(set.saved.notes, {
				created: async (entity) => {
					addToArray(setGlobal[set.id].notes.value, entity, (e) => e.id, (e) => e.title)
				},
				updated: async (entity) => {
					addToArray(setGlobal[set.id].notes.value, entity, (e) => e.id, (e) => e.title)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].notes.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].notes.value.splice(index, 1)
				}
			}),
			VideosUseCases.listenInList(set.saved.videos, {
				created: async (entity) => {
					addToArray(setGlobal[set.id].videos.value, entity, (e) => e.id, (e) => e.title)
				},
				updated: async (entity) => {
					addToArray(setGlobal[set.id].videos.value, entity, (e) => e.id, (e) => e.title)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].videos.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].videos.value.splice(index, 1)
				}
			}),
			FlashCardsUseCases.listenInList(set.saved.flashCards, {
				created: async (entity) => {
					addToArray(setGlobal[set.id].flashCards.value, entity, (e) => e.id, (e) => e.title)
				},
				updated: async (entity) => {
					addToArray(setGlobal[set.id].flashCards.value, entity, (e) => e.id, (e) => e.title)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].flashCards.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].flashCards.value.splice(index, 1)
				}
			}),
			TestPrepsUseCases.listenInList(set.saved.testPreps, {
				created: async (entity) => {
					addToArray(setGlobal[set.id].testPreps.value, entity, (e) => e.id, (e) => e.name)
				},
				updated: async (entity) => {
					addToArray(setGlobal[set.id].testPreps.value, entity, (e) => e.id, (e) => e.name)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].testPreps.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].testPreps.value.splice(index, 1)
				}
			}),
			SetsUseCases.listenInList(set.saved.sets, {
				created: async (entity) => {
					addToArray(setGlobal[set.id].sets.value, entity, (e) => e.id, (e) => e.name)
				},
				updated: async (entity) => {
					addToArray(setGlobal[set.id].sets.value, entity, (e) => e.id, (e) => e.name)
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
	}
	if (setGlobal[set.id] === undefined) {
		const listener = useListener(listenerFn)
		setGlobal[set.id] = {
			hash: ref(set.hash),
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
			const [notes, videos, flashCards, testPreps, sets] = await Promise.all([
				NotesUseCases.getInList(set.saved.notes), VideosUseCases.getInList(set.saved.videos),
				FlashCardsUseCases.getInList(set.saved.flashCards), TestPrepsUseCases.getInList(set.saved.testPreps),
				SetsUseCases.getInList(set.saved.sets)
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

	onMounted(async () => {
		if (!setGlobal[set.id].fetched.value && !setGlobal[set.id].loading.value) await fetchAllSetEntities()
		if (setGlobal[set.id].hash.value !== set.hash) {
			setGlobal[set.id].hash.value = set.hash
			await setGlobal[set.id].listener.reset(listenerFn)
		}
		await setGlobal[set.id].listener.start()
	})
	onUnmounted(async () => {
		await setGlobal[set.id].listener.close()
	})

	const notes = computed(() => setGlobal[set.id].notes.value.filter((note) => set.saved.notes.includes(note.id)))
	const videos = computed(() => setGlobal[set.id].videos.value.filter((video) => set.saved.videos.includes(video.id)))
	const flashCards = computed(() => setGlobal[set.id].flashCards.value.filter((flashCard) => set.saved.flashCards.includes(flashCard.id)))
	const testPreps = computed(() => setGlobal[set.id].testPreps.value.filter((testPrep) => set.saved.testPreps.includes(testPrep.id)))
	const sets = computed(() => setGlobal[set.id].sets.value.filter((s) => set.saved.sets.includes(s.id)))

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
			await SetsUseCases.saveProp(set.id, prop, [itemId])
			useStudyModal().closeSaveEntity()
			await Notify({ title: 'Saved to folder successfully' })
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	const removeFromSet = async (prop: SaveKey, itemId: string, set: SetEntity) => {
		try {
			await setLoading(true)
			await SetsUseCases.deleteProp(set.id, prop, [itemId])
			//@ts-ignore
			if (setGlobal[set.id]) setGlobal[set.id][prop].value = setGlobal[set.id][prop].value.filter((item) => item.id !== itemId)
			useStudyModal().closeSaveEntity()
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
				await SetsUseCases.add(factory.value)
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
export const openSetEditModal = async (set: SetEntity, router: Router) => {
	editingSet = set
	await router.push(`/study/sets/${set.id}/edit`)
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
				await SetsUseCases.update(editingSet!.id, factory.value)
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
				await SetsUseCases.delete(setId)
				await setMessage('Folder deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteSet }
}

