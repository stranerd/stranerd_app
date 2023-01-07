import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { FlashCardEntity, FlashCardsUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const store = {} as Record<string, {
	flashCards: Ref<FlashCardEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<FlashCardEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserFlashCardList = (id: string) => {
	if (store[id] === undefined) store[id] = {
		flashCards: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		searchMode: ref(false),
		searchResults: ref([]),
		searchValue: ref(''),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchFlashCards = async () => {
		await store[id].setError('')
		try {
			await store[id].setLoading(true)
			const flashCards = await FlashCardsUseCases.getUserFlashCards(id, store[id].flashCards.value.at(-1)?.createdAt)
			store[id].hasMore.value = !!flashCards.pages.next
			flashCards.results.forEach((q) => addToArray(store[id].flashCards.value, q, (e) => e.id, (e) => e.createdAt))
			store[id].fetched.value = true
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await FlashCardsUseCases.listenToUserFlashCards(id, {
			created: async (entity) => {
				addToArray(store[id].flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(store[id].flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				store[id].flashCards.value = store[id].flashCards.value.filter((c) => c.id !== entity.id)
			}
		}, store[id].flashCards.value.at(-1)?.createdAt)
	})

	onMounted(async () => {
		if (!store[id].fetched.value && !store[id].loading.value) await fetchFlashCards()
		await listener.start()
	})

	onUnmounted(async () => {
		await listener.close()
	})

	const search = async () => {
		const searchValue = store[id].searchValue.value
		if (!searchValue) return
		store[id].searchMode.value = true
		await store[id].setError('')
		try {
			await store[id].setLoading(true)
			store[id].searchResults.value = await FlashCardsUseCases.searchUserFlashCards(id, searchValue)
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	watch(store[id].searchValue, () => {
		if (!store[id].searchValue.value) store[id].searchMode.value = false
	})

	return { ...store[id], fetchOlderFlashCards: fetchFlashCards, search }
}
