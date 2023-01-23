import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { ConnectEntity, ConnectsUseCases } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { useReactionModal } from '@app/composable/core/modals'
import { saveRouteForAfterSub } from '@app/composable/payment/wallets'
import { useRoute } from 'vue-router'
import { useListener } from '@app/composable/core/listener'

const store = {} as Record<string, {
	connects: Ref<ConnectEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler> & ReturnType<typeof useSuccessHandler>>

export const useConnects = () => {
	const { id, isSubscribed } = useAuth()
	const userId = id.value
	const route = useRoute()
	if (store[userId] === undefined) {
		const listener = useListener(async () => {
			return ConnectsUseCases.listen({
				created: async (entity) => {
					addToArray(store[userId].connects.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(store[userId].connects.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = store[userId].connects.value.findIndex((t) => t.id === entity.id)
					if (index !== -1) store[userId].connects.value.splice(index, 1)
				}
			})
		})
		store[userId] = {
			connects: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useSuccessHandler(),
			...useLoadingHandler()
		}
	}

	const fetchConnects = async () => {
		if (!userId) return
		await store[userId].setError('')
		await store[userId].setLoading(true)
		try {
			const connects = await ConnectsUseCases.get()
			store[userId].connects.value = connects.results
			store[userId].fetched.value = true
		} catch (e) {
			await store[userId].setError(e)
		}
		await store[userId].setLoading(false)
	}

	onMounted(async () => {
		if (!store[userId].fetched.value && !store[userId].loading.value) await fetchConnects()
		await store[userId].listener.start()
	})
	onUnmounted(async () => {
		await store[userId].listener.close()
	})

	const createConnect = async (user: string) => {
		if (store[userId].loading.value) return
		if (!isSubscribed.value) {
			await saveRouteForAfterSub(route.fullPath)
			return useReactionModal().openNeedsSubscription()
		}
		await store[userId].setError('')
		await store[userId].setLoading(true)
		try {
			const connect = await ConnectsUseCases.create(user)
			addToArray(store[userId].connects.value, connect, (e) => e.id, (e) => e.createdAt)
			await store[userId].setMessage('Connection created')
		} catch (e) {
			await store[userId].setError(e)
		}
		await store[userId].setLoading(false)
	}

	const acceptConnect = async (connect: ConnectEntity, accept: boolean) => {
		if (store[userId].loading.value) return
		const type = accept ? 'accept' : 'reject'
		const accepted = await Alert({
			message: `Are you sure you want to ${type} this connection?`,
			confirmButtonText: `Yes, ${type}`
		})
		if (!accepted) return
		await store[userId].setError('')
		await store[userId].setLoading(true)
		try {
			await ConnectsUseCases.accept(connect.id, accept)
			await store[userId].setMessage(`Connection ${type}ed`)
		} catch (e) {
			await store[userId].setError(e)
		}
		await store[userId].setLoading(false)
	}

	const deleteConnect = async (connect: ConnectEntity) => {
		if (store[userId].loading.value) return
		const type = connect.pending ? 'cancel' : 'remove'
		const accepted = await Alert({
			message: `Are you sure you want to ${type} this connection?`,
			confirmButtonText: `Yes, ${type}`
		})
		if (!accepted) return
		await store[userId].setError('')
		await store[userId].setLoading(true)
		try {
			await ConnectsUseCases.delete(connect.id)
			await store[userId].setMessage('Connection removed')
		} catch (e) {
			await store[userId].setError(e)
		}
		await store[userId].setLoading(false)
	}

	const pendingConnects = computed(() => store[userId].connects.value
		.filter((c) => c.pending))
	const receivedConnects = computed(() => pendingConnects.value
		.filter((c) => c.to.id === userId))
	const sentConnects = computed(() => pendingConnects.value
		.filter((c) => c.from.id === userId))

	return {
		...store[userId], pendingConnects, receivedConnects, sentConnects,
		createConnect, acceptConnect, deleteConnect
	}
}
