import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import {
	DocumentEntity,
	DocumentsUseCases,
	FlashCardEntity,
	FlashCardsUseCases,
	SetEntity,
	SetFactory,
	SetSaved,
	SetsUseCases,
	TestPrepEntity,
	TestPrepsUseCases
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useStudyModal } from '@app/composable/core/modals'
import { Alert, Notify } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { Router } from 'vue-router'

const global = {} as Record<string, {
	set: Ref<SetEntity | null>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const setGlobal = {} as Record<string, {
	hash: Ref<string>
	saved: {
		documents: Ref<DocumentEntity[]>
		flashCards: Ref<FlashCardEntity[]>
		testPreps: Ref<TestPrepEntity[]>
	}
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
			DocumentsUseCases.listenInList(set.saved.documents, {
				created: async (entity) => {
					addToArray(setGlobal[set.id].saved.documents.value, entity, (e) => e.id, (e) => e.title)
				},
				updated: async (entity) => {
					addToArray(setGlobal[set.id].saved.documents.value, entity, (e) => e.id, (e) => e.title)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].saved.documents.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].saved.documents.value.splice(index, 1)
				}
			}),
			FlashCardsUseCases.listenInList(set.saved.flashCards, {
				created: async (entity) => {
					addToArray(setGlobal[set.id].saved.flashCards.value, entity, (e) => e.id, (e) => e.title)
				},
				updated: async (entity) => {
					addToArray(setGlobal[set.id].saved.flashCards.value, entity, (e) => e.id, (e) => e.title)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].saved.flashCards.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].saved.flashCards.value.splice(index, 1)
				}
			}),
			TestPrepsUseCases.listenInList(set.saved.testPreps, {
				created: async (entity) => {
					addToArray(setGlobal[set.id].saved.testPreps.value, entity, (e) => e.id, (e) => e.name)
				},
				updated: async (entity) => {
					addToArray(setGlobal[set.id].saved.testPreps.value, entity, (e) => e.id, (e) => e.name)
				},
				deleted: async (entity) => {
					const index = setGlobal[set.id].saved.testPreps.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setGlobal[set.id].saved.testPreps.value.splice(index, 1)
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
			saved: {
				documents: ref([]),
				flashCards: ref([]),
				testPreps: ref([])
			},
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
			const [documents, flashCards, testPreps] = await Promise.all([
				DocumentsUseCases.getInList(set.saved.documents), FlashCardsUseCases.getInList(set.saved.flashCards), TestPrepsUseCases.getInList(set.saved.testPreps)
			])
			setGlobal[set.id].saved.documents.value = documents.results
			setGlobal[set.id].saved.flashCards.value = flashCards.results
			setGlobal[set.id].saved.testPreps.value = testPreps.results
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

	const documents = computed(() => setGlobal[set.id].saved.documents.value.filter((document) => set.saved.documents.includes(document.id)))
	const flashCards = computed(() => setGlobal[set.id].saved.flashCards.value.filter((flashCard) => set.saved.flashCards.includes(flashCard.id)))
	const testPreps = computed(() => setGlobal[set.id].saved.testPreps.value.filter((testPrep) => set.saved.testPreps.includes(testPrep.id)))

	return {
		...setGlobal[set.id], fetchAllSetEntities,
		documents, flashCards, testPreps
	}
}

export const useSaveToSet = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const saveToSet = async (prop: SetSaved, itemId: string, set: SetEntity) => {
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

	const removeFromSet = async (prop: SetSaved, itemId: string, set: SetEntity) => {
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

