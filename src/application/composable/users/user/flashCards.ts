import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { FlashCardEntity, GetUserFlashCards, ListenToUserFlashCards } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'

const global = {} as Record<string, {
	flashCards: Ref<FlashCardEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToFlashCardList = (id: string, flashCard: FlashCardEntity) => {
	const index = global[id].flashCards.value.findIndex((q) => q.id === flashCard.id)
	if (index !== -1) global[id].flashCards.value.splice(index, 1, flashCard)
	else global[id].flashCards.value.push(flashCard)
}

export const useUserFlashCardList = (id: string) => {
	if (global[id] === undefined) global[id] = {
		flashCards: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchFlashCards = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const lastDate = global[id].flashCards.value[global[id].flashCards.value.length - 1]?.createdAt
			const flashCards = await GetUserFlashCards.call(id, lastDate)
			global[id].hasMore.value = !!flashCards.pages.next
			flashCards.results.forEach((q) => pushToFlashCardList(id, q))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToUserFlashCards.call(id, {
			created: async (entity) => {
				const index = global[id].flashCards.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].flashCards.value.unshift(entity)
				else global[id].flashCards.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = global[id].flashCards.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].flashCards.value.unshift(entity)
				else global[id].flashCards.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				global[id].flashCards.value = global[id].flashCards.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchFlashCards()
		await listener.startListener()
	})

	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global[id], fetchOlderFlashCards: fetchFlashCards }
}
