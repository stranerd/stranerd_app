import { Ref, ssrRef, useFetch } from 'vue'
import { useAuth } from '@app/hooks/auth/auth'
import { ChatMetaEntity, GetPersonalChatsMeta, ListenToPersonalChatsMeta } from '@modules/sessions'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/hooks/core/states'
import { AudioSounds, useAudioPlayer } from '@app/hooks/core/audios'

const player = useAudioPlayer(AudioSounds.CHAT)

const global = {} as Record<string, {
	meta: Ref<ChatMetaEntity[]>;
	fetched: Ref<boolean>;
	listener: ReturnType<typeof useListener>;
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useChatsList = () => {
	const { id } = useAuth()
	const userId = id.value ?? 'empty'
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			if (!id.value) return () => {
			}
			return ListenToPersonalChatsMeta.call({
				created: async (entity) => {
					const index = global[userId].meta.value.findIndex((m) => m.id === entity.id)
					if (index === -1) {
						global[userId].meta.value.unshift(entity)
						await player.play()
					} else {
						const globalUnReads = global[userId].meta.value[index]
						const hasNewMessage = entity.unRead.some((unRead) => !globalUnReads.unRead.includes(unRead))
						if (hasNewMessage) await player.play()
						global[userId].meta.value.splice(index, 1, entity)
					}
				},
				updated: async (entity) => {
					const index = global[userId].meta.value.findIndex((m) => m.id === entity.id)
					if (index === -1) {
						global[userId].meta.value.unshift(entity)
						await player.play()
					} else {
						const globalUnReads = global[userId].meta.value[index]
						const hasNewMessage = entity.unRead.some((unRead) => !globalUnReads.unRead.includes(unRead))
						if (hasNewMessage) await player.play()
						global[userId].meta.value.splice(index, 1, entity)
					}
				},
				deleted: async (entity) => {
					global[userId].meta.value = global[userId].meta.value.filter((m) => m.id !== entity.id)
				}
			})
		})
		global[userId] = {
			meta: ssrRef([]),
			fetched: ssrRef(false),
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
			const metas = await GetPersonalChatsMeta.call()
			global[userId].meta.value = metas.results
			global[userId].fetched.value = true
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}
	useFetch(async () => {
		if (!id.value) return
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchMeta()
	})
	return { ...global[userId] }
}
