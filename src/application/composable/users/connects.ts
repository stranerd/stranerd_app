import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { ConnectEntity, ConnectsUseCases } from '@modules/users'
import { useAuth } from '@app/composable/auth/auth'
import { Alert } from '@utils/dialog'

const global = {} as Record<string, {
	connect: Ref<ConnectEntity | null>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useConnectWith = (userId: string) => {
	const { id } = useAuth()
	const path: [string, string] = [id.value, userId]
	const key = path.join('---')
	if (global[key] === undefined) {
		const listener = useListener(async () => {
			const setConnect = async (connect: ConnectEntity) => {
				global[key].connect.value = connect
			}
			return ConnectsUseCases.listenBetweenUsers(path, {
				created: setConnect,
				updated: setConnect,
				deleted: setConnect
			})
		})
		global[key] = {
			connect: ref(null),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchConnect = async () => {
		await global[key].setError('')
		await global[key].setLoading(true)
		try {
			global[key].connect.value = await ConnectsUseCases.findBetweenUsers(path)
			global[key].fetched.value = true
		} catch (e) {
			await global[key].setError(e)
		}
		await global[key].setLoading(false)
	}

	const createConnect = async () => {
		await global[key].setError('')
		await global[key].setLoading(true)
		try {
			global[key].connect.value = await ConnectsUseCases.create(userId)
		} catch (e) {
			await global[key].setError(e)
		}
		await global[key].setLoading(false)
	}

	const acceptConnect = async (accept: boolean) => {
		const connect = global[key].connect.value
		if (!connect || !connect.pending) return
		const type = accept ? 'accept' : 'reject'
		const accepted = await Alert({
			title: `Are you sure you want to ${type} this connection?`,
			confirmButtonText: `Yes, ${type}`
		})
		if (!accepted) return
		await global[key].setError('')
		await global[key].setLoading(true)
		try {
			await ConnectsUseCases.accept(connect.id, accept)
		} catch (e) {
			await global[key].setError(e)
		}
		await global[key].setLoading(false)
	}

	const deleteConnect = async () => {
		const connect = global[key].connect.value
		if (!connect) return
		const type = connect.pending ? 'cancel' : 'remove'
		const accepted = await Alert({
			title: `Are you sure you want to ${type} this connection?`,
			confirmButtonText: `Yes, ${type}`
		})
		if (!accepted) return
		await global[key].setError('')
		await global[key].setLoading(true)
		try {
			await ConnectsUseCases.delete(connect.id)
		} catch (e) {
			await global[key].setError(e)
		}
		await global[key].setLoading(false)
	}

	onMounted(async () => {
		if (!global[key].fetched.value && !global[key].loading.value) await fetchConnect()
		await global[key].listener.start()
	})
	onUnmounted(async () => {
		await global[key].listener.close()
	})

	return { ...global[key], createConnect, acceptConnect, deleteConnect }
}
