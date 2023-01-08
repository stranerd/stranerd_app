import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import { NoteEntity, NoteFactory, NotesUseCases } from '@modules/study'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { Router, useRouter } from 'vue-router'
import { addToArray } from '@utils/commons'
import { useListener } from '@app/composable/core/listener'

const store = {
	notes: ref([] as NoteEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => await NotesUseCases.listen({
	created: async (entity) => {
		addToArray(store.notes.value, entity, (e) => e.id, (e) => e.createdAt)
	},
	updated: async (entity) => {
		addToArray(store.notes.value, entity, (e) => e.id, (e) => e.createdAt)
	},
	deleted: async (entity) => {
		const index = store.notes.value.findIndex((q) => q.id === entity.id)
		if (index !== -1) store.notes.value.splice(index, 1)
	}
}, store.notes.value.at(-1)?.createdAt))

export const useNoteList = () => {
	const fetchNotes = async () => {
		await store.setError('')
		try {
			await store.setLoading(true)
			const notes = await NotesUseCases.get(store.notes.value.at(-1)?.createdAt)
			store.hasMore.value = !!notes.pages.next
			notes.results.forEach((n) => addToArray(store.notes.value, n, (e) => e.id, (e) => e.createdAt))
			store.fetched.value = true
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}

	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchNotes()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...store, fetchOlderNotes: fetchNotes }
}

export const useCreateNote = () => {
	const router = useRouter()
	const factory = ref(new NoteFactory()) as Ref<NoteFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const createNote = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const note = await NotesUseCases.add(factory.value)
				await setMessage('Note submitted successfully')
				await router.push(`/study/notes/${note.id}`)
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
export const openNoteEditModal = async (note: NoteEntity, router: Router) => {
	editingNote = note
	await router.push(`/study/notes/${note.id}/edit`)
}
export const useEditNote = () => {
	const router = useRouter()
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
				const note = await NotesUseCases.update(editingNote!.id, factory.value)
				await setMessage('Note updated successfully')
				factory.value.reset()
				await router.push(`/study/notes/${note.id}`)
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
			message: 'Are you sure you want to delete this note?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await NotesUseCases.delete(noteId)
				store.notes.value = store.notes.value
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

export const useNote = (noteId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const note = computed({
		get: () => store.notes.value.find((q) => q.id === noteId) ?? null,
		set: (q) => {
			if (q) addToArray(store.notes.value, q, (e) => e.id, (e) => e.createdAt)
		}
	})

	const fetchNote = async () => {
		await setError('')
		try {
			await setLoading(true)
			let note = store.notes.value.find((q) => q.id === noteId) ?? null
			if (note) {
				await setLoading(false)
				return
			}
			note = await NotesUseCases.find(noteId)
			if (note) addToArray(store.notes.value, note, (e) => e.id, (e) => e.createdAt)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await NotesUseCases.listenToOne(noteId, {
			created: async (entity) => {
				addToArray(store.notes.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(store.notes.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				const index = store.notes.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) store.notes.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		await fetchNote()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { error, loading, note }
}
