import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { ChatMetaEntity, ChatMetasUseCases, ChatsUseCases } from '@modules/messaging'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { AudioSounds, useAudioPlayer } from '@app/composable/core/audios'
import { addToArray, groupBy } from '@utils/commons'

const player = useAudioPlayer(AudioSounds.CHAT)

const global = {} as Record<string, {
	meta: Ref<ChatMetaEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
	search: Ref<string>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useChatMetas = () => {
	const { id } = useAuth()
	const userId = id.value ?? 'empty'
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			if (!id.value) return () => {
			}
			return ChatMetasUseCases.listen({
				created: async (entity) => {
					// if (entity.hasUnRead(userId)) await player.play()
					addToArray(global[userId].meta.value, entity, (e) => e.id, (e) => (e.last?.createdAt ?? 0))
				},
				updated: async (entity) => {
					// if (entity.hasUnRead(userId)) await player.play()
					addToArray(global[userId].meta.value, entity, (e) => e.id, (e) => (e.last?.createdAt ?? 0))
				},
				deleted: async (entity) => {
					global[userId].meta.value = global[userId].meta.value.filter((m) => m.id !== entity.id)
				}
			})
		})
		global[userId] = {
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
		await global[userId].setError('')
		try {
			await global[userId].setLoading(true)
			const metas = await ChatMetasUseCases.get()
			metas.results.forEach((r) => addToArray(global[userId].meta.value, r, (e) => e.id, (e) => (e.last?.createdAt ?? 0)))
			global[userId].fetched.value = true
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}
	onMounted(async () => {
		if (!id.value) return
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchMeta()
		await global[userId].listener.start()
	})
	onUnmounted(async () => {
		await global[userId].listener.close()
	})
	const filteredMeta = computed(() => global[userId].meta.value.filter((m) => m.search(global[userId].search.value)))
	const groups = computed(() => groupBy(global[userId].meta.value.filter((m) => m.isClasses(m)), (m) => {
		return m.isClasses(m) ? m.data.group.classId : ''
	}))
	const connects = computed(() => global[userId].meta.value.filter((m) => m.isPersonal(m)))
	const unRead = computed(() => global[userId].meta.value.filter((m) => m.hasUnRead(id.value)))
	return { ...global[userId], groups, connects, unRead, meta: filteredMeta }
}

const metaGlobal = {} as Record<string, {
	unRead: Ref<number>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useChatMeta = (chatMeta: ChatMetaEntity) => {
	const { id } = useAuth()
	if (metaGlobal[chatMeta.id] === undefined) metaGlobal[chatMeta.id] = {
		unRead: ref(0),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchUnRead = async () => {
		metaGlobal[chatMeta.id].unRead.value = await ChatsUseCases.getUnReadCount([id.value, chatMeta.getTo(id.value)])
	}

	return { ...metaGlobal[chatMeta.id], fetchUnRead }
}
