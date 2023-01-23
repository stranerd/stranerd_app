import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { ReferralEntity, ReferralsUseCases } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray } from '@utils/commons'
import { useListener } from '@app/composable/core/listener'

const store = {} as Record<string, {
	referrals: Ref<ReferralEntity[]>
	hasMore: Ref<boolean>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useReferralList = () => {
	const { id } = useAuth()
	const userId = id.value ?? 'empty'
	if (store[userId] === undefined) {
		const listener = useListener(async () => {
			if (!id.value) return () => {
			}
			return ReferralsUseCases.listen({
				created: async (entity) => {
					addToArray(store[userId].referrals.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(store[userId].referrals.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = store[userId].referrals.value.findIndex((t) => t.id === entity.id)
					if (index !== -1) store[userId].referrals.value.splice(index, 1)
				}
			}, store[userId].referrals.value.at(-1)?.createdAt)
		})
		store[userId] = {
			referrals: ref([]),
			hasMore: ref(false),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchReferrals = async () => {
		if (!id.value) return
		await store[userId].setError('')
		await store[userId].setLoading(true)
		try {
			const referrals = await ReferralsUseCases.get(store[userId].referrals.value.at(-1)?.createdAt)
			store[userId].hasMore.value = !!referrals.pages.next
			referrals.results.forEach((t) => addToArray(store[userId].referrals.value, t, (e) => e.id, (e) => e.createdAt))
		} catch (e) {
			await store[userId].setError(e)
		}
		await store[userId].setLoading(false)
	}

	onMounted(async () => {
		if (!id.value) return
		if (!store[userId].fetched.value && !store[userId].loading.value) await fetchReferrals()
		await store[userId].listener.start()
	})
	onUnmounted(async () => {
		await store[userId].listener.close()
	})

	return { ...store[userId], fetchOlderReferrals: fetchReferrals }
}
