import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { ChatEntity, ChatFactory, ChatsUseCases } from '@modules/messaging'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray, groupBy } from '@utils/commons'
import { useListener } from '@app/composable/core/listener'

const store = {} as Record<string, {
	chats: Ref<ChatEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const orderChats = (chats: ChatEntity[]) => groupBy(chats.slice().reverse(), (c) => {
	const createdAt = new Date(c.createdAt)
	return new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate(), 0, 0, 0, 1).getTime()
})

export const useChats = (to: string) => {
	const { id } = useAuth()
	const path = [id.value, to] as [string, string]
	if (store[to] === undefined) {
		const listener = useListener(async () => await ChatsUseCases.listen(path, {
			created: async (entity) => {
				addToArray(store[to].chats.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(store[to].chats.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				const index = store[to].chats.value.findIndex((c) => c.id === entity.id)
				if (index !== -1) store[to].chats.value.splice(index, 1)
			}
		}, store[to].chats.value.at(-1)?.createdAt))
		store[to] = {
			chats: ref([]),
			fetched: ref(false),
			hasMore: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchChats = async () => {
		await store[to].setError('')
		try {
			await store[to].setLoading(true)
			const c = await ChatsUseCases.get(path, store[to].chats.value.at(-1)?.createdAt)
			store[to].hasMore.value = !!c.pages.next
			c.results.map((c) => addToArray(store[to].chats.value, c, (e) => e.id, (e) => e.createdAt))
			store[to].fetched.value = true
		} catch (e) {
			await store[to].setError(e)
		}
		await store[to].setLoading(false)
	}

	const fetchOlderChats = async () => {
		await fetchChats()
		await store[to].listener.restart()
	}

	onMounted(async () => {
		if (!store[to].fetched.value && !store[to].loading.value) await fetchChats()
		await store[to].listener.start()
	})
	onUnmounted(async () => {
		await store[to].listener.close()
	})

	return {
		chats: computed(() => orderChats(store[to].chats.value)),
		fetched: store[to].fetched,
		loading: store[to].loading,
		error: store[to].error,
		hasMore: store[to].hasMore,
		fetchOlderChats
	}
}

export const useCreateChat = (to: string) => {
	const factory = ref(new ChatFactory()) as Ref<ChatFactory>
	const loadingCounter = ref(0)
	const { error, setError } = useErrorHandler()
	factory.value.to = to

	const createTextChat = async () => {
		await setError('')
		if (factory.value.valid && !loadingCounter.value) {
			loadingCounter.value++
			try {
				await ChatsUseCases.add(factory.value)
				factory.value.reset()
			} catch (e) {
				await setError(e)
			}
			loadingCounter.value--
			factory.value.reset()
		}
	}

	const createMediaChat = async (factories: ChatFactory[]) => {
		await Promise.all(factories.map(async (mediaFactory) => {
			mediaFactory.to = to
			loadingCounter.value++
			try {
				await ChatsUseCases.add(mediaFactory)
			} catch (error) {
				await setError(error)
			}
			loadingCounter.value--
		}))
	}

	return { factory, error, loadingCounter, createTextChat, createMediaChat }
}

export const useChat = (chat: ChatEntity) => {
	const { id } = useAuth()
	const markChatRead = async () => {
		await ChatsUseCases.markRead(chat.to)
	}
	onMounted(async () => {
		if (!chat.isRead(id.value)) await markChatRead()
	})
	return { markChatRead }
}
