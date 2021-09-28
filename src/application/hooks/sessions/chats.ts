import { computed, Ref, ref, ssrRef, useFetch } from 'vue'
import { AddChat, ChatEntity, ChatFactory, GetChats, ListenToChats, MarkChatRead } from '@modules/sessions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { useAuth } from '@app/hooks/auth/auth'
import { getRandomValue } from '@utils/commons'

const global = {} as Record<string, {
	chats: Ref<ChatEntity[]>,
	fetched: Ref<boolean>,
	hasMore: Ref<boolean>
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

export const useChats = (userId: string) => {
	const { id } = useAuth()
	if (global[userId] === undefined) global[userId] = {
		chats: ssrRef([]),
		fetched: ssrRef(false),
		hasMore: ssrRef(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}
	const path = [id.value, userId] as [string, string]

	const chats = computed({
		// TODO: figure out if the sort is important cos it slows down initial request
		get: () => global[userId].chats.value, /* .sort((a, b) => {
		 return a.createdAt - b.createdAt < 0 ? -1 : 1
		 }), */
		set: (chats) => chats.map((c) => pushToChats(userId, c))
	})

	const fetchChats = async () => {
		await global[userId].setError('')
		try {
			await global[userId].setLoading(true)
			const lastDate = chats.value[0]?.createdAt
			const c = await GetChats.call(path, lastDate)
			global[userId].hasMore.value = !!c.pages.next
			c.results.map((c) => unshiftToChats(userId, c))
			global[userId].fetched.value = true
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	const listener = useListener(async () => {
		const lastDate = chats.value[0]?.createdAt
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

	const fetchOlderChats = async () => {
		await fetchChats()
		await listener.resetListener(async () => {
			const lastDate = chats.value[0]?.createdAt
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

	useFetch(async () => {
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchChats()
	})

	return {
		chats: computed({
			get: () => orderChats(chats.value),
			set: (sessions) => sessions.map((session) => session.chats.map((c) => pushToChats(userId, c)))
		}),
		fetched: global[userId].fetched,
		loading: global[userId].loading,
		error: global[userId].error,
		hasMore: global[userId].hasMore,
		listener,
		fetchOlderChats
	}
}

export const useCreateChat = (userId: string, sessionId?: string) => {
	const { id } = useAuth()
	const path = [id.value, userId] as [string, string]
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
				await AddChat.call(path, factory.value)
				factory.value.reset()
			} catch (e) {
				await setError(e)
			}
			factory.value.reset()
			await setLoading(false)
		}
	}

	const createMediaChat = async (files: File[]) => {
		if (!loading.value) {
			await setLoading(true)
			const promises = files.map(async (file) => {
				const mediaFactory = new ChatFactory()
				mediaFactory.to = userId
				mediaFactory.media = file
				try {
					await AddChat.call(path, mediaFactory)
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

const orderChats = (chats: ChatEntity[]) => {
	const isSameDay = (date1: Date, date2: Date) => date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	const res = [] as ChatEntity[][]
	chats.forEach((chat, index) => {
		const lastChat = chats[index - 1]
		if (index === 0 || !isSameDay(new Date(chat.createdAt), new Date(lastChat.createdAt))) return res.push([chat])
		else return res[res.length - 1].push(chat)
	})
	return res.map((chats) => {
		const date = chats[0].createdAt
		return { chats, date, hash: getRandomValue() }
	})
}

export const useChat = (chat: ChatEntity, userId: string) => {
	const { id } = useAuth()
	const path = [id.value, userId] as [string, string]

	const markChatRead = async () => {
		await MarkChatRead.call(path, chat.id)
	}

	return { markChatRead }
}
