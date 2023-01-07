import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import {
	FlashCardEntity,
	FlashCardsUseCases,
	NoteEntity,
	NotesUseCases,
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
import { QuestionEntity, QuestionsUseCases } from '@modules/questions'

const store = {} as Record<string, {
	set: Ref<SetEntity | null>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const setStore = {} as Record<string, {
	hash: Ref<string>
	saved: {
		questions: Ref<QuestionEntity[]>
		notes: Ref<NoteEntity[]>
		flashCards: Ref<FlashCardEntity[]>
		testPreps: Ref<TestPrepEntity[]>
	}
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useSetById = (setId: string) => {
	if (store[setId] === undefined) {
		const listener = useListener(async () => {
			return SetsUseCases.listenToOne(setId, {
				created: async (entity) => {
					store[setId].set.value = entity
				},
				updated: async (entity) => {
					store[setId].set.value = entity
				},
				deleted: async () => {
					store[setId].set.value = null
				}
			})
		})
		store[setId] = {
			set: ref(null),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchSet = async () => {
		await store[setId].setError('')
		try {
			await store[setId].setLoading(true)
			store[setId].set.value = await SetsUseCases.find(setId)
		} catch (error) {
			await store[setId].setError(error)
		}
		await store[setId].setLoading(false)
	}

	onMounted(async () => {
		if (!store[setId].fetched.value && !store[setId].loading.value) await fetchSet()
		await store[setId].listener.start()
	})
	onUnmounted(async () => {
		await store[setId].listener.close()
	})

	return { ...store[setId] }
}

export const useSet = (set: SetEntity) => {
	const listenerFn = async () => {
		const listeners = await Promise.all([
			QuestionsUseCases.listenInList(set.saved.questions, {
				created: async (entity) => {
					addToArray(setStore[set.id].saved.questions.value, entity, (e) => e.id, (e) => e.trimmedBody)
				},
				updated: async (entity) => {
					addToArray(setStore[set.id].saved.questions.value, entity, (e) => e.id, (e) => e.trimmedBody)
				},
				deleted: async (entity) => {
					const index = setStore[set.id].saved.questions.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setStore[set.id].saved.questions.value.splice(index, 1)
				}
			}),
			NotesUseCases.listenInList(set.saved.notes, {
				created: async (entity) => {
					addToArray(setStore[set.id].saved.notes.value, entity, (e) => e.id, (e) => e.title)
				},
				updated: async (entity) => {
					addToArray(setStore[set.id].saved.notes.value, entity, (e) => e.id, (e) => e.title)
				},
				deleted: async (entity) => {
					const index = setStore[set.id].saved.notes.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setStore[set.id].saved.notes.value.splice(index, 1)
				}
			}),
			FlashCardsUseCases.listenInList(set.saved.flashCards, {
				created: async (entity) => {
					addToArray(setStore[set.id].saved.flashCards.value, entity, (e) => e.id, (e) => e.title)
				},
				updated: async (entity) => {
					addToArray(setStore[set.id].saved.flashCards.value, entity, (e) => e.id, (e) => e.title)
				},
				deleted: async (entity) => {
					const index = setStore[set.id].saved.flashCards.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setStore[set.id].saved.flashCards.value.splice(index, 1)
				}
			}),
			TestPrepsUseCases.listenInList(set.saved.testPreps, {
				created: async (entity) => {
					addToArray(setStore[set.id].saved.testPreps.value, entity, (e) => e.id, (e) => e.name)
				},
				updated: async (entity) => {
					addToArray(setStore[set.id].saved.testPreps.value, entity, (e) => e.id, (e) => e.name)
				},
				deleted: async (entity) => {
					const index = setStore[set.id].saved.testPreps.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) setStore[set.id].saved.testPreps.value.splice(index, 1)
				}
			})
		])
		return async () => {
			await Promise.all(listeners.map(((listener) => listener())))
		}
	}
	if (setStore[set.id] === undefined) {
		const listener = useListener(listenerFn)
		setStore[set.id] = {
			hash: ref(set.hash),
			saved: {
				questions: ref([]),
				notes: ref([]),
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
		await setStore[set.id].setError('')
		try {
			await setStore[set.id].setLoading(true)
			const [questions, notes, flashCards, testPreps] = await Promise.all([
				QuestionsUseCases.getInList(set.saved.questions), NotesUseCases.getInList(set.saved.notes),
				FlashCardsUseCases.getInList(set.saved.flashCards), TestPrepsUseCases.getInList(set.saved.testPreps)
			])
			setStore[set.id].saved.questions.value = questions.results
			setStore[set.id].saved.notes.value = notes.results
			setStore[set.id].saved.flashCards.value = flashCards.results
			setStore[set.id].saved.testPreps.value = testPreps.results
			setStore[set.id].fetched.value = true
		} catch (error) {
			await setStore[set.id].setError(error)
		}
		await setStore[set.id].setLoading(false)
	}

	onMounted(async () => {
		if (!setStore[set.id].fetched.value && !setStore[set.id].loading.value) await fetchAllSetEntities()
		if (setStore[set.id].hash.value !== set.hash) setStore[set.id].hash.value = set.hash
		await setStore[set.id].listener.reset(listenerFn)
	})
	onUnmounted(async () => {
		await setStore[set.id].listener.close()
	})

	const questions = computed(() => setStore[set.id].saved.questions.value.filter((question) => set.saved.questions.includes(question.id)))
	const notes = computed(() => setStore[set.id].saved.notes.value.filter((note) => set.saved.notes.includes(note.id)))
	const flashCards = computed(() => setStore[set.id].saved.flashCards.value.filter((flashCard) => set.saved.flashCards.includes(flashCard.id)))
	const testPreps = computed(() => setStore[set.id].saved.testPreps.value.filter((testPrep) => set.saved.testPreps.includes(testPrep.id)))

	return {
		...setStore[set.id], fetchAllSetEntities,
		questions, notes, flashCards, testPreps
	}
}

export const useSaveToSet = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const saveToSet = async (prop: SetSaved, itemId: string, set: SetEntity) => {
		try {
			await setLoading(true)
			await SetsUseCases.saveProp(set.id, prop, [itemId], true)
			useStudyModal().closeSaveEntity()
			await Notify({ message: 'Saved to folder successfully' })
		} catch (e) {
			await setError(e)
		}
		await setLoading(false)
	}

	const removeFromSet = async (prop: SetSaved, itemId: string, set: SetEntity) => {
		try {
			await setLoading(true)
			await SetsUseCases.saveProp(set.id, prop, [itemId], false)
			// @ts-ignore
			if (setStore[set.id]) setStore[set.id].saved[prop].value = setStore[set.id][prop].value.filter((item) => item.id !== itemId)
			useStudyModal().closeSaveEntity()
			await Notify({ message: 'Removed from folder successfully' })
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
			message: 'Are you sure you want to delete this folder?',
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

