import { onMounted, onUnmounted, ref } from 'vue'
import { Currencies, PlanEntity, PlansUseCases } from '@modules/payment'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'
import { useUserModal } from '@app/composable/core/modals'

const noPlan = new PlanEntity({
	id: null as unknown as string, createdAt: 0, updatedAt: 0,
	active: true, amount: 0, currency: Currencies.NGN, interval: 'monthly', name: 'Basic',
	data: { questions: 0, flashCards: 1 }
})

const store = {
	plans: ref([noPlan]),
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => await PlansUseCases.listen({
	created: async (entity) => {
		addToArray(store.plans.value, entity, (e) => e.id, (e) => e.amount, true)
	},
	updated: async (entity) => {
		addToArray(store.plans.value, entity, (e) => e.id, (e) => e.amount, true)
	},
	deleted: async (entity) => {
		const index = store.plans.value.findIndex((q) => q.id === entity.id)
		if (index !== -1) store.plans.value.splice(index, 1)
	}
}))

export const usePlanList = () => {
	const fetchPlans = async () => {
		await store.setError('')
		try {
			await store.setLoading(true)
			const plans = await PlansUseCases.get()
			plans.results.forEach((q) => addToArray(store.plans.value, q, (e) => e.id, (e) => e.amount, true))
			store.fetched.value = true
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}

	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchPlans()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...store }
}

let subscribingTo = null as PlanEntity | null
export const getCurrentlySubscribingTo = () => subscribingTo
export const openSubscriptionDetailsMenu = (plan: PlanEntity) => {
	subscribingTo = plan
	useUserModal().openSubscriptionDetails()
}

