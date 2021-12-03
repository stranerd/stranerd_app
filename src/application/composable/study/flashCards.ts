import { computed, onMounted, Ref, ref } from 'vue'
import {
	AddFlashCard,
	DeleteFlashCard,
	EditFlashCard,
	FindFlashCard,
	FlashCardEntity,
	FlashCardFactory,
	GetFlashCards,
	GetUserFlashCards,
	ListenToFlashCard,
	ListenToFlashCards,
	ListenToUserFlashCards
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@app/composable/core/notifications'
import { useAuth } from '@app/composable/auth/auth'
import { Router, useRouter } from 'vue-router'

const global = {
	flashCards: ref([] as FlashCardEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const myGlobal = {
	flashCards: ref([] as FlashCardEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToFlashCardList = (flashCard: FlashCardEntity) => {
	const index = global.flashCards.value.findIndex((q) => q.id === flashCard.id)
	if (index !== -1) global.flashCards.value.splice(index, 1, flashCard)
	else global.flashCards.value.push(flashCard)
}
const unshiftToFlashCardList = (flashCard: FlashCardEntity) => {
	const index = global.flashCards.value.findIndex((q) => q.id === flashCard.id)
	if (index !== -1) global.flashCards.value.splice(index, 1, flashCard)
	else global.flashCards.value.unshift(flashCard)
}

export const useFlashCardList = () => {
	const { id } = useAuth()

	const fetchFlashCards = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const lastDate = global.flashCards.value[global.flashCards.value.length - 1]?.createdAt
			const flashCards = await GetFlashCards.call(id.value, lastDate)
			global.hasMore.value = !!flashCards.pages.next
			flashCards.results.forEach(pushToFlashCardList)
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const listener = useListener(async () => {
		const lastDate = global.flashCards.value[global.flashCards.value.length - 1]?.createdAt
		return await ListenToFlashCards.call(id.value, {
			created: async (entity) => {
				unshiftToFlashCardList(entity)
			},
			updated: async (entity) => {
				unshiftToFlashCardList(entity)
			},
			deleted: async (entity) => {
				const index = global.flashCards.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.flashCards.value.splice(index, 1)
			}
		}, lastDate)
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchFlashCards()
	})

	return { ...global, listener }
}

export const useMyFlashCards = () => {
	const { id } = useAuth()

	const fetchFlashCards = async () => {
		await myGlobal.setError('')
		try {
			await myGlobal.setLoading(true)
			const flashCards = await GetUserFlashCards.call(id.value)
			flashCards.results.forEach(pushToFlashCardList)
			myGlobal.fetched.value = true
		} catch (error) {
			await myGlobal.setError(error)
		}
		await myGlobal.setLoading(false)
	}
	const listener = useListener(async () => {
		return await ListenToUserFlashCards.call(id.value, {
			created: async (entity) => {
				unshiftToFlashCardList(entity)
			},
			updated: async (entity) => {
				unshiftToFlashCardList(entity)
			},
			deleted: async (entity) => {
				const index = myGlobal.flashCards.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) myGlobal.flashCards.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		if (!myGlobal.fetched.value && !myGlobal.loading.value) await fetchFlashCards()
	})

	return { ...myGlobal, listener }
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
				const flashCardId = await AddFlashCard.call(factory.value)
				await setMessage('FlashCard submitted successfully')
				await router.replace(`/study/flashCards/${flashCardId}`)
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
export const openFlashCardEditModal = (flashCard: FlashCardEntity, router: Router) => {
	editingFlashCard = flashCard
	router.push(`/study/flashCards/${flashCard.id}/edit`)
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
				await setMessage('FlashCard edited successfully')
				await router.replace(`/study/flashCards/${flashCardId}`)
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
			text: 'This cannot be reversed',
			icon: 'warning',
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
			if (q) pushToFlashCardList(q)
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
			if (flashCard) unshiftToFlashCardList(flashCard)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await ListenToFlashCard.call(flashCardId, {
			created: async (entity) => {
				unshiftToFlashCardList(entity)
			},
			updated: async (entity) => {
				unshiftToFlashCardList(entity)
			},
			deleted: async (entity) => {
				const index = global.flashCards.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.flashCards.value.splice(index, 1)
			}
		})
	})

	onMounted(fetchFlashCard)

	return { error, loading, flashCard, listener }
}

