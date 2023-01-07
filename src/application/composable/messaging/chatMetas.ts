import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { ChatMetaEntity, ChatMetasUseCases, ChatsUseCases } from '@modules/messaging'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { AudioSounds, useAudioPlayer } from '@app/composable/core/audios'
import { addToArray, groupBy } from '@utils/commons'

const player = useAudioPlayer(AudioSounds.CHAT)

const store = {} as Record<string, {
	meta: Ref<ChatMetaEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
	search: Ref<string>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useChatMetas = () => {
	const { id } = useAuth()
	const userId = id.value ?? 'empty'
	if (store[userId] === undefined) {
		const listener = useListener(async () => {
			if (!id.value) return () => {
			}
			return ChatMetasUseCases.listen({
				created: async (entity) => {
					// if (entity.hasUnRead(userId)) await player.play()
					addToArray(store[userId].meta.value, entity, (e) => e.id, (e) => (e.last?.createdAt ?? 0))
				},
				updated: async (entity) => {
					// if (entity.hasUnRead(userId)) await player.play()
					addToArray(store[userId].meta.value, entity, (e) => e.id, (e) => (e.last?.createdAt ?? 0))
				},
				deleted: async (entity) => {
					store[userId].meta.value = store[userId].meta.value.filter((m) => m.id !== entity.id)
				}
			})
		})
		store[userId] = {
			meta: ref([]),
			fetched: ref(false),
			search: ref(''),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}
	const fetchMeta = async () => {
		if (!id.value) return
		await store[userId].setError('')
		try {
			await store[userId].setLoading(true)
			const metas = await ChatMetasUseCases.get()
			metas.results.forEach((r) => addToArray(store[userId].meta.value, r, (e) => e.id, (e) => (e.last?.createdAt ?? 0)))
			store[userId].fetched.value = true
		} catch (e) {
			await store[userId].setError(e)
		}
		await store[userId].setLoading(false)
	}
	onMounted(async () => {
		if (!id.value) return
		if (!store[userId].fetched.value && !store[userId].loading.value) await fetchMeta()
		await store[userId].listener.start()
	})
	onUnmounted(async () => {
		await store[userId].listener.close()
	})
	const filteredMeta = computed(() => store[userId].meta.value.filter((m) => m.search(store[userId].search.value)))
	const groups = computed(() => groupBy(store[userId].meta.value.filter((m) => m.isClasses(m)), (m) => {
		return m.isClasses(m) ? m.data.group.classId : ''
	}))
	const connects = computed(() => store[userId].meta.value.filter((m) => m.isPersonal(m)))
	const unRead = computed(() => store[userId].meta.value.filter((m) => m.hasUnRead(id.value)))
	return { ...store[userId], groups, connects, unRead, meta: filteredMeta }
}

const metaStore = {} as Record<string, {
	unRead: Ref<number>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useChatMeta = (chatMeta: ChatMetaEntity) => {
	const { id } = useAuth()
	if (metaStore[chatMeta.id] === undefined) metaStore[chatMeta.id] = {
		unRead: ref(0),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchUnRead = async () => {
		metaStore[chatMeta.id].unRead.value = await ChatsUseCases.getUnReadCount([id.value, chatMeta.getTo(id.value)])
	}

	return { ...metaStore[chatMeta.id], fetchUnRead }
}
