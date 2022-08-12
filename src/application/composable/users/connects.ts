import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { ConnectEntity, ConnectsUseCases } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'
import { Alert, Notify } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { useRouter } from 'vue-router'

const global = {} as Record<string, {
	connects: Ref<ConnectEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler> & ReturnType<typeof useSuccessHandler>>

export const useConnects = () => {
	const router = useRouter()
	const { id, isSubscribed } = useAuth()
	const userId = id.value
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			return ConnectsUseCases.listen({
				created: async (entity) => {
					addToArray(global[userId].connects.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(global[userId].connects.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = global[userId].connects.value.findIndex((t) => t.id === entity.id)
					if (index !== -1) global[userId].connects.value.splice(index, 1)
				}
			})
		})
		global[userId] = {
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
		await global[userId].setError('')
		await global[userId].setLoading(true)
		try {
			const connects = await ConnectsUseCases.get()
			global[userId].connects.value = connects.results
			global[userId].fetched.value = true
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	onMounted(async () => {
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchConnects()
		await global[userId].listener.start()
	})
	onUnmounted(async () => {
		await global[userId].listener.close()
	})

	const createConnect = async (user: string) => {
		if (!isSubscribed.value) {
			await router.push('/settings/subscription/plans')
			return await Notify({ title: 'You need an active subscription to connect with users!' })
		}
		await global[userId].setError('')
		await global[userId].setLoading(true)
		try {
			const connect = await ConnectsUseCases.create(user)
			addToArray(global[userId].connects.value, connect, (e) => e.id, (e) => e.createdAt)
			await global[userId].setMessage('Connection created')
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	const acceptConnect = async (connect: ConnectEntity, accept: boolean) => {
		const type = accept ? 'accept' : 'reject'
		const accepted = await Alert({
			title: `Are you sure you want to ${type} this connection?`,
			confirmButtonText: `Yes, ${type}`
		})
		if (!accepted) return
		await global[userId].setError('')
		await global[userId].setLoading(true)
		try {
			await ConnectsUseCases.accept(connect.id, accept)
			await global[userId].setMessage(`Connection ${type}ed`)
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	const deleteConnect = async (connect: ConnectEntity) => {
		const type = connect.pending ? 'cancel' : 'remove'
		const accepted = await Alert({
			title: `Are you sure you want to ${type} this connection?`,
			confirmButtonText: `Yes, ${type}`
		})
		if (!accepted) return
		await global[userId].setError('')
		await global[userId].setLoading(true)
		try {
			await ConnectsUseCases.delete(connect.id)
			await global[userId].setMessage('Connection removed')
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	const pendingConnects = computed(() => global[userId].connects.value
		.filter((c) => c.pending && c.to.id === userId))

	return {
		...global[userId], pendingConnects,
		createConnect, acceptConnect, deleteConnect
	}
}
