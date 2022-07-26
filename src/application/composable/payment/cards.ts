import { onMounted, onUnmounted, ref } from 'vue'
import { CardEntity, CardsUseCases } from '@modules/payment'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {
	cards: ref([] as CardEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => await CardsUseCases.listen({
	created: async (entity) => {
		addToArray(global.cards.value, entity, (e) => e.id, (e) => e.createdAt, true)
	},
	updated: async (entity) => {
		addToArray(global.cards.value, entity, (e) => e.id, (e) => e.createdAt, true)
	},
	deleted: async (entity) => {
		const index = global.cards.value.findIndex((q) => q.id === entity.id)
		if (index !== -1) global.cards.value.splice(index, 1)
	}
}))

export const useCardsList = () => {
	const fetchCards = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const cards = await CardsUseCases.get()
			cards.results.forEach((q) => addToArray(global.cards.value, q, (e) => e.id, (e) => e.createdAt, true))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchCards()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global }
}
