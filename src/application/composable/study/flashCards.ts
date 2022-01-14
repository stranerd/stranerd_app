import { computed, onUnmounted, onMounted, Ref, ref } from 'vue'
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
import { Alert } from '@utils/dialog'
import { useAuth } from '@app/composable/auth/auth'
import { Router, useRouter } from 'vue-router'

const global = {
	flashCards: ref([] as FlashCardEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const userGlobal = {} as Record<string, {
	flashCards: Ref<FlashCardEntity[]>
	fetched: Ref<boolean>,
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

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
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global }
}

export const useUserFlashCardList = (userId: string) => {
	if (userGlobal[userId] === undefined) userGlobal[userId] = {
		flashCards: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchFlashCards = async () => {
		await userGlobal[userId].setError('')
		try {
			await userGlobal[userId].setLoading(true)
			const flashCards = await GetUserFlashCards.call(userId)
			userGlobal[userId].flashCards.value = flashCards.results
			userGlobal[userId].fetched.value = true
		} catch (error) {
			await userGlobal[userId].setError(error)
		}
		await userGlobal[userId].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToUserFlashCards.call(userId, {
			created: async (entity) => {
				const index = userGlobal[userId].flashCards.value.findIndex((c) => c.id === entity.id)
				if (index === -1) userGlobal[userId].flashCards.value.push(entity)
				else userGlobal[userId].flashCards.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = userGlobal[userId].flashCards.value.findIndex((c) => c.id === entity.id)
				if (index === -1) userGlobal[userId].flashCards.value.push(entity)
				else userGlobal[userId].flashCards.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				userGlobal[userId].flashCards.value = userGlobal[userId].flashCards.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!userGlobal[userId].fetched.value && !userGlobal[userId].loading.value) await fetchFlashCards()
	})

	return {
		error: userGlobal[userId].error,
		loading: userGlobal[userId].loading,
		flashCards: userGlobal[userId].flashCards,
		listener
	}
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

	onMounted(async () => {
		await fetchFlashCard()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { error, loading, flashCard }
}

