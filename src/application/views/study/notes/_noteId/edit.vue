<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<NoteForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editNote"
			class="h-full"
		/>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEditingNote, useEditNote } from '@app/composable/study/notes'
import { useAuth } from '@app/composable/auth/auth'
import NoteForm from '@app/components/study/notes/NoteForm.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyNotesNoteIdEdit',
	components: { NoteForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { noteId = '' } = to.params
		const note = getEditingNote()
		if (!note || note.id !== noteId) return `/study/notes/${noteId}`
		const canEdit = note.user.id === id.value
		if (!canEdit) return `/study/notes/${note.id}`
	}]),
	setup () {
		useRouteMeta('Edit Note', { back: true })
		const { factory, error, loading, editNote } = useEditNote()
		return { factory, error, loading, editNote }
	}
})
</script>
