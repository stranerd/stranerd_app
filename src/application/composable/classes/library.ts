import { computed, onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { ChatEntity, ChatsUseCases } from '@modules/messaging'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

type Filters = 'images' | 'videos' | 'docs' | 'links'

const global = {} as Record<string, {
	chats: Ref<ChatEntity[]>
	type: Ref<Filters>
	groupId: Ref<string | null>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<ChatEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useClassLibrary = (classId: string) => {
	if (global[classId] === undefined) {
		const listener = useListener(async () => {
			return ChatsUseCases.listenToClassLibrary(classId, global[classId].type.value, {
				created: async (entity) => {
					addToArray(global[classId].chats.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(global[classId].chats.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = global[classId].chats.value.findIndex((c) => c.id === entity.id)
					if (index !== -1) global[classId].chats.value.splice(index, 1)
				}
			}, global[classId].groupId.value ?? undefined, global[classId].chats.value.at(0)?.createdAt)
		})
		global[classId] = {
			chats: ref([]),
			type: ref('images'),
			groupId: ref(null),
			fetched: ref(false),
			hasMore: ref(false),
			listener,
			searchMode: ref(false),
			searchResults: ref([]),
			searchValue: ref(''),
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchChats = async () => {
		await global[classId].setError('')
		try {
			await global[classId].setLoading(true)
			const chats = await ChatsUseCases.getClassLibrary(
				classId,
				global[classId].type.value,
				global[classId].groupId.value ?? undefined,
				global[classId].chats.value.at(-1)?.createdAt)
			chats.results.map((d) => addToArray(global[classId].chats.value, d, (e) => e.id, (e) => e.createdAt))
			global[classId].hasMore.value = !!chats.pages.next
			global[classId].fetched.value = true
		} catch (e) {
			await global[classId].setError(e)
		}
		await global[classId].setLoading(false)
	}

	const search = async () => {
		const searchValue = global[classId].searchValue.value
		if (!searchValue) return
		global[classId].searchMode.value = true
		await global[classId].setError('')
		try {
			await global[classId].setLoading(true)
			global[classId].searchResults.value = await ChatsUseCases.searchClassLibrary(classId, global[classId].type.value, searchValue, global[classId].groupId.value ?? undefined)
			global[classId].fetched.value = true
		} catch (error) {
			await global[classId].setError(error)
		}
		await global[classId].setLoading(false)
	}

	watch(global[classId].searchValue, () => {
		if (!global[classId].searchValue.value) global[classId].searchMode.value = false
	})

	watch([global[classId].groupId, global[classId].type], async () => {
		global[classId].chats.value = []
		await fetchChats()
		await global[classId].listener.restart()
	})
	onMounted(async () => {
		if (!global[classId].fetched.value && !global[classId].loading.value) await fetchChats()
		await global[classId].listener.start()
	})
	onUnmounted(async () => {
		await global[classId].listener.close()
	})

	const chats = computed(() => global[classId].searchMode.value ? global[classId].searchResults.value : global[classId].chats.value)

	return { ...global[classId], chats, fetchOlderChats: fetchChats, search }
}
