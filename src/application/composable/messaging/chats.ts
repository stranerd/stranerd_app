import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { ChatEntity, ChatFactory, ChatsUseCases } from '@modules/messaging'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray, groupBy } from '@utils/commons'

const global = {} as Record<string, {
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
	if (global[to] === undefined) {
		const listener = useListener(async () => await ChatsUseCases.listen(path, {
			created: async (entity) => {
				addToArray(global[to].chats.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global[to].chats.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				const index = global[to].chats.value.findIndex((c) => c.id === entity.id)
				if (index !== -1) global[to].chats.value.splice(index, 1)
			}
		}, global[to].chats.value.at(-1)?.createdAt))
		global[to] = {
			chats: ref([]),
			fetched: ref(false),
			hasMore: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchChats = async () => {
		await global[to].setError('')
		try {
			await global[to].setLoading(true)
			const c = await ChatsUseCases.get(path, global[to].chats.value.at(-1)?.createdAt)
			global[to].hasMore.value = !!c.pages.next
			c.results.map((c) => addToArray(global[to].chats.value, c, (e) => e.id, (e) => e.createdAt))
			global[to].fetched.value = true
		} catch (e) {
			await global[to].setError(e)
		}
		await global[to].setLoading(false)
	}

	const fetchOlderChats = async () => {
		await fetchChats()
		await global[to].listener.restart()
	}

	onMounted(async () => {
		if (!global[to].fetched.value && !global[to].loading.value) await fetchChats()
		await global[to].listener.start()
	})
	onUnmounted(async () => {
		await global[to].listener.close()
	})

	return {
		chats: computed(() => orderChats(global[to].chats.value)),
		fetched: global[to].fetched,
		loading: global[to].loading,
		error: global[to].error,
		hasMore: global[to].hasMore,
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
