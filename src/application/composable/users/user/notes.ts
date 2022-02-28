import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { GetUserNotes, ListenToUserNotes, NoteEntity } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'

const global = {} as Record<string, {
	notes: Ref<NoteEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToNoteList = (id: string, note: NoteEntity) => {
	const index = global[id].notes.value.findIndex((q) => q.id === note.id)
	if (index !== -1) global[id].notes.value.splice(index, 1, note)
	else global[id].notes.value.push(note)
}

export const useUserNoteList = (id: string) => {
	if (global[id] === undefined) global[id] = {
		notes: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchNotes = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const lastDate = global[id].notes.value[global[id].notes.value.length - 1]?.createdAt
			const notes = await GetUserNotes.call(id, lastDate)
			global[id].hasMore.value = !!notes.pages.next
			notes.results.forEach((q) => pushToNoteList(id, q))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToUserNotes.call(id, {
			created: async (entity) => {
				const index = global[id].notes.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].notes.value.unshift(entity)
				else global[id].notes.value.splice(index, 1, entity)
			},
			updated: async (entity) => {
				const index = global[id].notes.value.findIndex((c) => c.id === entity.id)
				if (index === -1) global[id].notes.value.unshift(entity)
				else global[id].notes.value.splice(index, 1, entity)
			},
			deleted: async (entity) => {
				global[id].notes.value = global[id].notes.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchNotes()
		await listener.startListener()
	})

	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { ...global[id], fetchOlderNotes: fetchNotes }
}
