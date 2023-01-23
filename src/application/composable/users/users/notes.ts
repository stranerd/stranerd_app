import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { NoteEntity, NotesUseCases } from '@modules/study'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'
import { useListener } from '@app/composable/core/listener'

const store = {} as Record<string, {
	notes: Ref<NoteEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<NoteEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserNoteList = (id: string) => {
	if (store[id] === undefined) store[id] = {
		notes: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		searchMode: ref(false),
		searchResults: ref([]),
		searchValue: ref(''),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchNotes = async () => {
		await store[id].setError('')
		try {
			await store[id].setLoading(true)
			const notes = await NotesUseCases.getUserNotes(id, store[id].notes.value.at(-1)?.createdAt)
			store[id].hasMore.value = !!notes.pages.next
			notes.results.forEach((q) => addToArray(store[id].notes.value, q, (e) => e.id, (e) => e.createdAt))
			store[id].fetched.value = true
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await NotesUseCases.listenToUserNotes(id, {
			created: async (entity) => {
				addToArray(store[id].notes.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(store[id].notes.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				store[id].notes.value = store[id].notes.value.filter((c) => c.id !== entity.id)
			}
		}, store[id].notes.value.at(-1)?.createdAt)
	})

	onMounted(async () => {
		if (!store[id].fetched.value && !store[id].loading.value) await fetchNotes()
		await listener.start()
	})

	onUnmounted(async () => {
		await listener.close()
	})

	const search = async () => {
		const searchValue = store[id].searchValue.value
		if (!searchValue) return
		store[id].searchMode.value = true
		await store[id].setError('')
		try {
			await store[id].setLoading(true)
			store[id].searchResults.value = await NotesUseCases.searchUserNotes(id, searchValue)
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	watch(store[id].searchValue, () => {
		if (!store[id].searchValue.value) store[id].searchMode.value = false
	})

	return { ...store[id], fetchOlderNotes: fetchNotes, search }
}
