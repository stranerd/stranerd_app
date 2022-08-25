import { onMounted, onUnmounted, ref } from 'vue'
import { CardEntity, CardsUseCases } from '@modules/payment'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'
import { Alert } from '@utils/dialog'

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

export const useCard = (card: CardEntity) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()

	const makeCardPrimary = async () => {
		await setError('')
		if (card.primary) return
		const res = await Alert({
			title: 'Do you want this card as your default for payments and subscriptions?',
			confirmButtonText: 'Yes',
			cancelButtonText: 'No'
		})
		if (!res) return
		try {
			await setLoading(true)
			card = await CardsUseCases.makePrimary(card.id)
			await setMessage('Card now primary')
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	const deleteCard = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this card?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await CardsUseCases.delete(card.id)
				global.cards.value = global.cards.value.filter((c) => c.id !== card.id)
				await setMessage('Card deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, message, makeCardPrimary, deleteCard }
}
