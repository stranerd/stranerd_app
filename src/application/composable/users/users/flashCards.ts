import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { FlashCardEntity, GetUserFlashCards, ListenToUserFlashCards } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	flashCards: Ref<FlashCardEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

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
			flashCards.results.forEach((q) => addToArray(global[id].flashCards.value, q, (e) => e.id, (e) => e.createdAt))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToUserFlashCards.call(id, {
			created: async (entity) => {
				addToArray(global[id].flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global[id].flashCards.value, entity, (e) => e.id, (e) => e.createdAt)
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
