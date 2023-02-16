import { useListener } from '@app/composable/core/listener'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { FlashCardEntity, FlashCardFactory, FlashCardsUseCases } from '@modules/study'
import { addToArray } from '@utils/commons'
import { Alert } from '@utils/dialog'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Router, useRouter } from 'vue-router'

const store = {
	flashCards: ref([] as FlashCardEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => await FlashCardsUseCases.listen({
	created: async (entity) => {
		addToArray(store.flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
	},
	updated: async (entity) => {
		addToArray(store.flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
	},
	deleted: async (entity) => {
		const index = store.flashCards.value.findIndex((q) => q.id === entity.id)
		if (index !== -1) store.flashCards.value.splice(index, 1)
	}
}, store.flashCards.value.at(-1)?.createdAt))

export const useFlashCardList = () => {
	const fetchFlashCards = async () => {
		await store.setError('')
		try {
			await store.setLoading(true)
			const flashCards = await FlashCardsUseCases.get(store.flashCards.value.at(-1)?.createdAt)
			store.hasMore.value = !!flashCards.pages.next
			flashCards.results.forEach((f) => addToArray(store.flashCards.value, f, (e) => e.id, (e) => e.createdAt))
			store.fetched.value = true
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}

	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchFlashCards()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...store, fetchOlderFlashCards: fetchFlashCards }
}

let clone = null as FlashCardEntity | null
export const cloneFlashCard = async (flashCard: FlashCardEntity, router: Router) => {
	clone = flashCard
	await router.push('/study/flashCards/create')
}

export const useCreateFlashCard = () => {
	const router = useRouter()
	const factory = new FlashCardFactory()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	if (clone) {
		factory.loadEntity(clone)
		clone = null
	}

	const createFlashCard = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				const flashCard = await FlashCardsUseCases.add(factory)
				await setMessage('FlashCard submitted successfully')
				await router.push(`/study/flashCards/${flashCard.id}`)
				factory.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { error, loading, factory, createFlashCard }
}

let editingFlashCard = null as FlashCardEntity | null
export const getEditingFlashCard = () => editingFlashCard
export const openFlashCardEditModal = async (flashCard: FlashCardEntity, router: Router) => {
	editingFlashCard = flashCard
	await router.push(`/study/flashCards/${flashCard.id}/edit`)
}
export const useEditFlashCard = (flashCardId: string) => {
	const router = useRouter()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = new FlashCardFactory()
	if (editingFlashCard) factory.loadEntity(editingFlashCard)

	const editFlashCard = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				const flashCard = await FlashCardsUseCases.update(flashCardId, factory)
				await setMessage('FlashCard updated successfully')
				await router.push(`/study/flashCards/${flashCard.id}`)
				factory.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { error, loading, factory, editFlashCard }
}

export const useDeleteFlashCard = (flashCardId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteFlashCard = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to delete this flashCard?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await FlashCardsUseCases.delete(flashCardId)
				store.flashCards.value = store.flashCards.value
					.filter((q) => q.id !== flashCardId)
				await setMessage('FlashCard deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteFlashCard }
}

export const useFlashCard = (flashCardId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const flashCard = computed({
		get: () => store.flashCards.value.find((q) => q.id === flashCardId) ?? null,
		set: (q) => {
			if (q) addToArray(store.flashCards.value, q, (e) => e.id, (e) => e.createdAt)
		}
	})

	const fetchFlashCard = async () => {
		await setError('')
		try {
			await setLoading(true)
			let flashCard = store.flashCards.value.find((q) => q.id === flashCardId) ?? null
			if (flashCard) {
				await setLoading(false)
				return
			}
			flashCard = await FlashCardsUseCases.find(flashCardId)
			if (flashCard) addToArray(store.flashCards.value, flashCard, (e) => e.id, (e) => e.createdAt)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await FlashCardsUseCases.listenToOne(flashCardId, {
			created: async (entity) => {
				addToArray(store.flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(store.flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				const index = store.flashCards.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) store.flashCards.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		await fetchFlashCard()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { error, loading, flashCard }
}

export const useSaveFlashCardMatch = (flashCardId: string) => {
	const record = ref(null as { time: number, record: boolean } | null)
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const saveMatch = async (time: number) => {
		await setError('')
		if (!loading.value) {
			await setLoading(true)
			try {
				record.value = await FlashCardsUseCases.saveMatch(flashCardId, time)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, saveMatch, record }
}
