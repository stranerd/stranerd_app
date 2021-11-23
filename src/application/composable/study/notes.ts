import { onMounted, Ref, ref } from 'vue'
import { AddNote, DeleteNote, EditNote, GetNotes, ListenToNotes, NoteEntity, NoteFactory } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@app/composable/core/notifications'

const global = {
	notes: ref([] as NoteEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const pushToNoteList = (note: NoteEntity) => {
	const index = global.notes.value.findIndex((q) => q.id === note.id)
	if (index !== -1) global.notes.value.splice(index, 1, note)
	else global.notes.value.push(note)
}
const unshiftToNoteList = (note: NoteEntity) => {
	const index = global.notes.value.findIndex((q) => q.id === note.id)
	if (index !== -1) global.notes.value.splice(index, 1, note)
	else global.notes.value.unshift(note)
}

export const useNoteList = () => {
	const fetchNotes = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const lastDate = global.notes.value[global.notes.value.length - 1]?.createdAt
			const notes = await GetNotes.call(lastDate)
			global.hasMore.value = !!notes.pages.next
			notes.results.forEach(pushToNoteList)
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const listener = useListener(async () => {
		const lastDate = global.notes.value[global.notes.value.length - 1]?.createdAt
		return await ListenToNotes.call({
			created: async (entity) => {
				unshiftToNoteList(entity)
			},
			updated: async (entity) => {
				unshiftToNoteList(entity)
			},
			deleted: async (entity) => {
				const index = global.notes.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.notes.value.splice(index, 1)
			}
		}, lastDate ? lastDate - 1 : undefined)
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchNotes()
	})

	return {
		...global, listener,
		fetchOlderNotes: fetchNotes
	}
}

export const useCreateNote = () => {
	const factory = ref(new NoteFactory()) as Ref<NoteFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const createNote = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AddNote.call(factory.value)
				await setMessage('Note submitted successfully')
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, createNote }
}

let editingNote = null as NoteEntity | null
export const getEditingNote = () => editingNote
export const openNoteEditModal = (note: NoteEntity) => {
	editingNote = note
}
export const useEditNote = (noteId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new NoteFactory()) as Ref<NoteFactory>
	if (editingNote) factory.value.loadEntity(editingNote)

	const editNote = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await EditNote.call(noteId, factory.value)
				await setMessage('Note edited successfully')
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editNote }
}

export const useDeleteNote = (noteId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteNote = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this note?',
			text: 'This cannot be reversed',
			icon: 'warning',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteNote.call(noteId)
				global.notes.value = global.notes.value
					.filter((q) => q.id !== noteId)
				await setMessage('Note deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteNote }
}