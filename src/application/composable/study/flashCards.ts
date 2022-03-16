import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import {
	AddFlashCard,
	DeleteFlashCard,
	EditFlashCard,
	FindFlashCard,
	FlashCardEntity,
	FlashCardFactory,
	GetFlashCards,
	ListenToFlashCard,
	ListenToFlashCards
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { Router, useRouter } from 'vue-router'
import { addToArray } from '@utils/commons'

const global = {
	flashCards: ref([] as FlashCardEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	const lastDate = global.flashCards.value[global.flashCards.value.length - 1]?.createdAt
	return await ListenToFlashCards.call({
		created: async (entity) => {
			addToArray(global.flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		updated: async (entity) => {
			addToArray(global.flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		deleted: async (entity) => {
			const index = global.flashCards.value.findIndex((q) => q.id === entity.id)
			if (index !== -1) global.flashCards.value.splice(index, 1)
		}
	}, lastDate)
})

export const useFlashCardList = () => {
	const fetchFlashCards = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const lastDate = global.flashCards.value[global.flashCards.value.length - 1]?.createdAt
			const flashCards = await GetFlashCards.call(lastDate)
			global.hasMore.value = !!flashCards.pages.next
			flashCards.results.forEach((f) => addToArray(global.flashCards.value, f, (e) => e.id, (e) => e.createdAt))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchFlashCards()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global, fetchOlderFlashCards: fetchFlashCards }
}

export const useCreateFlashCard = () => {
	const router = useRouter()
	const factory = ref(new FlashCardFactory()) as Ref<FlashCardFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const createFlashCard = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const flashCard = await AddFlashCard.call(factory.value)
				await setMessage('FlashCard submitted successfully')
				await router.push(`/study/flashCards/${flashCard.id}`)
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
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
	const factory = ref(new FlashCardFactory()) as Ref<FlashCardFactory>
	if (editingFlashCard) factory.value.loadEntity(editingFlashCard)

	const editFlashCard = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await EditFlashCard.call(flashCardId, factory.value)
				await setMessage('FlashCard updated successfully')
				await router.push(`/study/flashCards/${flashCardId}`)
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
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
			title: 'Are you sure you want to delete this flashCard?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteFlashCard.call(flashCardId)
				global.flashCards.value = global.flashCards.value
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
		get: () => global.flashCards.value.find((q) => q.id === flashCardId) ?? null,
		set: (q) => {
			if (q) addToArray(global.flashCards.value, q, (e) => e.id, (e) => e.createdAt)
		}
	})

	const fetchFlashCard = async () => {
		await setError('')
		try {
			await setLoading(true)
			let flashCard = global.flashCards.value.find((q) => q.id === flashCardId) ?? null
			if (flashCard) {
				await setLoading(false)
				return
			}
			flashCard = await FindFlashCard.call(flashCardId)
			if (flashCard) addToArray(global.flashCards.value, flashCard, (e) => e.id, (e) => e.createdAt)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await ListenToFlashCard.call(flashCardId, {
			created: async (entity) => {
				addToArray(global.flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global.flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				const index = global.flashCards.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.flashCards.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		await fetchFlashCard()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { error, loading, flashCard }
}

