import { onMounted, ref, Ref } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { GetReferrals, ListenToReferrals, ReferralEntity } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'

const global = {} as Record<string, {
	referrals: Ref<ReferralEntity[]>
	hasMore: Ref<boolean>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToReferralList = (userId: string, referral: ReferralEntity) => {
	const index = global[userId].referrals.value.findIndex((t) => t.id === referral.id)
	if (index !== -1) global[userId].referrals.value.splice(index, 1, referral)
	else global[userId].referrals.value.push(referral)
}

const unshiftToReferralList = (userId: string, referral: ReferralEntity) => {
	const index = global[userId].referrals.value.findIndex((t) => t.id === referral.id)
	if (index !== -1) global[userId].referrals.value.splice(index, 1, referral)
	else global[userId].referrals.value.unshift(referral)
}

export const useReferralList = () => {
	const { id } = useAuth()
	const userId = id.value ?? 'empty'
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			if (!id.value) return () => {
			}
			const lastDate = global[userId].referrals.value[global[userId].referrals.value.length - 1]?.createdAt
			return ListenToReferrals.call(userId, {
				created: async (entity) => {
					unshiftToReferralList(userId, entity)
				},
				updated: async (entity) => {
					unshiftToReferralList(userId, entity)
				},
				deleted: async (entity) => {
					const index = global[userId].referrals.value.findIndex((t) => t.id === entity.id)
					if (index !== -1) global[userId].referrals.value.splice(index, 1)
				}
			}, lastDate)
		})
		global[userId] = {
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
		await global[userId].setError('')
		await global[userId].setLoading(true)
		try {
			const lastDate = global[userId].referrals.value[global[userId].referrals.value.length - 1]?.createdAt
			const referrals = await GetReferrals.call(userId, lastDate)
			global[userId].hasMore.value = !!referrals.pages.next
			referrals.results.forEach((t) => pushToReferralList(userId, t))
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	onMounted(async () => {
		if (!id.value) return
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchReferrals()
	})

	return { ...global[userId], fetchOlderReferrals: fetchReferrals }
}
