import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { ChatEntity, ChatFactory, ChatsUseCases } from '@modules/sessions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { addToArray, groupBy } from '@utils/commons'
import { UploadedFile } from '@modules/core'

const global = {} as Record<string, {
	chats: Ref<ChatEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const orderChats = (chats: ChatEntity[]) => {
	return groupBy(chats.slice().reverse(), (c) => {
		const createdAt = new Date(c.createdAt)
		return new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate(), 0, 0, 0, 1).getTime()
	})
}

export const useChats = (userId: string) => {
	const { id } = useAuth()
	const path = [id.value, userId] as [string, string]
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			const lastDate = global[userId].chats.value[global[userId].chats.value.length - 1]?.createdAt
			return ChatsUseCases.listen(path, {
				created: async (entity) => {
					addToArray(global[userId].chats.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(global[userId].chats.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = global[userId].chats.value.findIndex((c) => c.id === entity.id)
					if (index !== -1) global[userId].chats.value.splice(index, 1)
				}
			}, lastDate)
		})
		global[userId] = {
			chats: ref([]),
			fetched: ref(false),
			hasMore: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchChats = async () => {
		await global[userId].setError('')
		try {
			await global[userId].setLoading(true)
			const lastDate = global[userId].chats.value[global[userId].chats.value.length - 1]?.createdAt
			const c = await ChatsUseCases.get(path, lastDate)
			global[userId].hasMore.value = !!c.pages.next
			c.results.map((c) => addToArray(global[userId].chats.value, c, (e) => e.id, (e) => e.createdAt))
			global[userId].fetched.value = true
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	const fetchOlderChats = async () => {
		await fetchChats()
		await global[userId].listener.restart()
	}

	onMounted(async () => {
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchChats()
		await global[userId].listener.start()
	})
	onUnmounted(async () => {
		await global[userId].listener.close()
	})

	return {
		chats: computed({
			get: () => orderChats(global[userId].chats.value),
			set: (sessions) => sessions.map((session) => session.values.map((c) => addToArray(global[userId].chats.value, c, (e) => e.id, (e) => e.createdAt)))
		}),
		fetched: global[userId].fetched,
		loading: global[userId].loading,
		error: global[userId].error,
		hasMore: global[userId].hasMore,
		fetchOlderChats
	}
}

export const useCreateChat = (userId: string, sessionId?: string) => {
	const factory = ref(new ChatFactory()) as Ref<ChatFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()

	factory.value.to = userId

	const createTextChat = async () => {
		if (sessionId) factory.value.sessionId = sessionId
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await ChatsUseCases.add(factory.value)
				factory.value.reset()
			} catch (e) {
				await setError(e)
			}
			factory.value.reset()
			await setLoading(false)
		}
	}

	const createMediaChat = async (files: UploadedFile[]) => {
		if (!loading.value) {
			await setLoading(true)
			const promises = files.map(async (file) => {
				const mediaFactory = new ChatFactory()
				mediaFactory.to = userId
				mediaFactory.media = file
				try {
					await ChatsUseCases.add(mediaFactory)
				} catch (error) {
					await setError(error)
				}
			})
			await Promise.all(promises)
			await setLoading(false)
		}
	}

	return { factory, error, loading, createTextChat, createMediaChat }
}

export const useChat = (chat: ChatEntity, userId: string) => {
	const { id } = useAuth()
	const path = [id.value, userId] as [string, string]

	const markChatRead = async () => {
		await ChatsUseCases.markRead(path, chat.id)
	}

	return { markChatRead }
}
