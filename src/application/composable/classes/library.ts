import { computed, onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { ChatEntity, ChatsUseCases } from '@modules/messaging'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

type Filters = 'images' | 'videos' | 'docs' | 'links'

const store = {} as Record<string, {
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
	if (store[classId] === undefined) {
		const listener = useListener(async () => {
			return ChatsUseCases.listenToClassLibrary(classId, store[classId].type.value, {
				created: async (entity) => {
					addToArray(store[classId].chats.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(store[classId].chats.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = store[classId].chats.value.findIndex((c) => c.id === entity.id)
					if (index !== -1) store[classId].chats.value.splice(index, 1)
				}
			}, store[classId].groupId.value ?? undefined, store[classId].chats.value.at(0)?.createdAt)
		})
		store[classId] = {
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
		await store[classId].setError('')
		try {
			await store[classId].setLoading(true)
			const chats = await ChatsUseCases.getClassLibrary(
				classId,
				store[classId].type.value,
				store[classId].groupId.value ?? undefined,
				store[classId].chats.value.at(-1)?.createdAt)
			chats.results.map((d) => addToArray(store[classId].chats.value, d, (e) => e.id, (e) => e.createdAt))
			store[classId].hasMore.value = !!chats.pages.next
			store[classId].fetched.value = true
		} catch (e) {
			await store[classId].setError(e)
		}
		await store[classId].setLoading(false)
	}

	const search = async () => {
		const searchValue = store[classId].searchValue.value
		if (!searchValue) return
		store[classId].searchMode.value = true
		await store[classId].setError('')
		try {
			await store[classId].setLoading(true)
			store[classId].searchResults.value = await ChatsUseCases.searchClassLibrary(classId, store[classId].type.value, searchValue, store[classId].groupId.value ?? undefined)
			store[classId].fetched.value = true
		} catch (error) {
			await store[classId].setError(error)
		}
		await store[classId].setLoading(false)
	}

	watch(store[classId].searchValue, () => {
		if (!store[classId].searchValue.value) store[classId].searchMode.value = false
	})

	watch([store[classId].groupId, store[classId].type], async () => {
		store[classId].chats.value = []
		await fetchChats()
		await store[classId].listener.restart()
	})
	onMounted(async () => {
		if (!store[classId].fetched.value && !store[classId].loading.value) await fetchChats()
		await store[classId].listener.start()
	})
	onUnmounted(async () => {
		await store[classId].listener.close()
	})

	const chats = computed(() => store[classId].searchMode.value ? store[classId].searchResults.value : store[classId].chats.value)

	return { ...store[classId], chats, fetchOlderChats: fetchChats, search }
}
