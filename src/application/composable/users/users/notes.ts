import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { GetUserNotes, ListenToUserNotes, NoteEntity } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	notes: Ref<NoteEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

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
			notes.results.forEach((q) => addToArray(global[id].notes.value, q, (e) => e.id, (e) => e.createdAt))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await ListenToUserNotes.call(id, {
			created: async (entity) => {
				addToArray(global[id].notes.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global[id].notes.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				global[id].notes.value = global[id].notes.value.filter((c) => c.id !== entity.id)
			}
		})
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchNotes()
		await listener.start()
	})

	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global[id], fetchOlderNotes: fetchNotes }
}
