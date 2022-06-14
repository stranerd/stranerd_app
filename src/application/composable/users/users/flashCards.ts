import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { FlashCardEntity, FlashCardsUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	flashCards: Ref<FlashCardEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<FlashCardEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserFlashCardList = (id: string) => {
	if (global[id] === undefined) global[id] = {
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
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const flashCards = await FlashCardsUseCases.getUserFlashCards(id, global[id].flashCards.value.at(-1)?.createdAt)
			global[id].hasMore.value = !!flashCards.pages.next
			flashCards.results.forEach((q) => addToArray(global[id].flashCards.value, q, (e) => e.id, (e) => e.createdAt))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await FlashCardsUseCases.listenToUserFlashCards(id, {
			created: async (entity) => {
				addToArray(global[id].flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global[id].flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				global[id].flashCards.value = global[id].flashCards.value.filter((c) => c.id !== entity.id)
			}
		}, global[id].flashCards.value.at(-1)?.createdAt)
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchFlashCards()
		await listener.start()
	})

	onUnmounted(async () => {
		await listener.close()
	})

	const search = async () => {
		const searchValue = global[id].searchValue.value
		if (!searchValue) return
		global[id].searchMode.value = true
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			global[id].searchResults.value = await FlashCardsUseCases.searchUserFlashCards(id, searchValue)
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	watch(() => global[id].searchValue.value, () => {
		if (!global[id].searchValue.value) global[id].searchMode.value = false
	})

	return { ...global[id], fetchOlderFlashCards: fetchFlashCards, search }
}
