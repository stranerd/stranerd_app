import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { useAuth } from '@app/composable/auth/auth'
import { ChatMetaEntity, ChatMetasUseCases } from '@modules/messaging'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { AudioSounds, useAudioPlayer } from '@app/composable/core/audios'
import { addToArray } from '@utils/commons'

const player = useAudioPlayer(AudioSounds.CHAT)

const global = {} as Record<string, {
	meta: Ref<ChatMetaEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
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
					if (entity.readAt[id.value] > (entity.last?.readAt[id.value] ?? 0)) await player.play()
					addToArray(global[userId].meta.value, entity, (e) => e.id, (e) => (e.last?.createdAt ?? 0))
				},
				updated: async (entity) => {
					if (entity.readAt[id.value] > (entity.last?.readAt[id.value] ?? 0)) await player.play()
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
	return { ...global[userId] }
}
