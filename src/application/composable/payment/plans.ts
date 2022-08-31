import { onMounted, onUnmounted, ref } from 'vue'
import { Currencies, PlanEntity, PlansUseCases } from '@modules/payment'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const noPlan = new PlanEntity({
	id: null as unknown as string, createdAt: 0, updatedAt: 0,
	active: true, amount: 0, currency: Currencies.NGN, interval: 'monthly', name: 'Solo', data: { questions: 0 }
})

const global = {
	plans: ref([noPlan]),
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => await PlansUseCases.listen({
	created: async (entity) => {
		addToArray(global.plans.value, entity, (e) => e.id, (e) => e.amount, true)
	},
	updated: async (entity) => {
		addToArray(global.plans.value, entity, (e) => e.id, (e) => e.amount, true)
	},
	deleted: async (entity) => {
		const index = global.plans.value.findIndex((q) => q.id === entity.id)
		if (index !== -1) global.plans.value.splice(index, 1)
	}
}))

export const usePlanList = () => {
	const fetchPlans = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const plans = await PlansUseCases.get()
			plans.results.forEach((q) => addToArray(global.plans.value, q, (e) => e.id, (e) => e.amount, true))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchPlans()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global }
}
