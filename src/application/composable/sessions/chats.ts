import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { AddChat, ChatEntity, ChatFactory, GetChats, ListenToChats, MarkChatRead } from '@modules/sessions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { getRandomValue } from '@utils/commons'
import { Media } from '@modules/core'

const global = {} as Record<string, {
	chats: Ref<ChatEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToChats = (userId: string, chat: ChatEntity) => {
	const index = global[userId].chats.value.findIndex((c) => c.id === chat.id)
	if (index !== -1) global[userId].chats.value.splice(index, 1, chat)
	else global[userId].chats.value.push(chat)
}
const unshiftToChats = (userId: string, chat: ChatEntity) => {
	const index = global[userId].chats.value.findIndex((c) => c.id === chat.id)
	if (index !== -1) global[userId].chats.value.splice(index, 1, chat)
	else global[userId].chats.value.unshift(chat)
}

const orderChats = (chats: ChatEntity[]) => {
	const isSameDay = (date1: Date, date2: Date) => date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	const res = [] as ChatEntity[][]
	chats
		.sort((a, b) => a.createdAt - b.createdAt)
		.forEach((chat, index) => {
			const lastChat = chats[index - 1]
			if (index === 0 || !isSameDay(new Date(chat.createdAt), new Date(lastChat.createdAt))) return res.push([chat])
			else return res[res.length - 1].push(chat)
		})
	return res.map((chats) => {
		const date = chats[0].createdAt
		return { chats, date, hash: getRandomValue() }
	})
}

export const useChats = (userId: string) => {
	const { id } = useAuth()
	const path = [id.value, userId] as [string, string]
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			const lastDate = global[userId].chats.value[global[userId].chats.value.length - 1]?.createdAt
			return ListenToChats.call(path, {
				created: async (entity) => {
					unshiftToChats(userId, entity)
				},
				updated: async (entity) => {
					unshiftToChats(userId, entity)
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
			const c = await GetChats.call(path, lastDate)
			global[userId].hasMore.value = !!c.pages.next
			c.results.map((c) => pushToChats(userId, c))
			global[userId].fetched.value = true
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	const fetchOlderChats = async () => {
		await fetchChats()
		await global[userId].listener.resetListener(async () => {
			const lastDate = global[userId].chats.value[global[userId].chats.value.length - 1]?.createdAt
			return ListenToChats.call(path, {
				created: async (entity) => {
					pushToChats(userId, entity)
				},
				updated: async (entity) => {
					pushToChats(userId, entity)
				},
				deleted: async (entity) => {
					const index = global[userId].chats.value.findIndex((c) => c.id === entity.id)
					if (index !== -1) global[userId].chats.value.splice(index, 1)
				}
			}, lastDate)
		})
	}

	onMounted(async () => {
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchChats()
		await global[userId].listener.startListener()
	})
	onUnmounted(async () => {
		await global[userId].listener.closeListener()
	})

	return {
		chats: computed({
			get: () => orderChats(global[userId].chats.value),
			set: (sessions) => sessions.map((session) => session.chats.map((c) => pushToChats(userId, c)))
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
				await AddChat.call(factory.value)
				factory.value.reset()
			} catch (e) {
				await setError(e)
			}
			factory.value.reset()
			await setLoading(false)
		}
	}

	const createMediaChat = async (files: Media[]) => {
		if (!loading.value) {
			await setLoading(true)
			const promises = files.map(async (file) => {
				const mediaFactory = new ChatFactory()
				mediaFactory.to = userId
				mediaFactory.media = file
				try {
					await AddChat.call(mediaFactory)
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
		await MarkChatRead.call(path, chat.id)
	}

	return { markChatRead }
}
