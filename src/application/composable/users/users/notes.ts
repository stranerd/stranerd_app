import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { NoteEntity, NotesUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	notes: Ref<NoteEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<NoteEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserNoteList = (id: string) => {
	if (global[id] === undefined) global[id] = {
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
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const notes = await NotesUseCases.getUserNotes(id, global[id].notes.value.at(-1)?.createdAt)
			global[id].hasMore.value = !!notes.pages.next
			notes.results.forEach((q) => addToArray(global[id].notes.value, q, (e) => e.id, (e) => e.createdAt))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await NotesUseCases.listenToUserNotes(id, {
			created: async (entity) => {
				addToArray(global[id].notes.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global[id].notes.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				global[id].notes.value = global[id].notes.value.filter((c) => c.id !== entity.id)
			}
		}, global[id].notes.value.at(-1)?.createdAt)
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchNotes()
		await listener.start()
	})

	onUnmounted(async () => {
		await listener.close()
	})

	const search = async () => {
		const searchValue = global[id].searchValue.value
		if (!searchValue) return
		global[id].searchMode.value = true
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			global[id].searchResults.value = await NotesUseCases.searchUserNotes(id, searchValue)
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	watch(global[id].searchValue, () => {
		if (!global[id].searchValue.value) global[id].searchMode.value = false
	})

	return { ...global[id], fetchOlderNotes: fetchNotes, search }
}
