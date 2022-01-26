<template>
	<AdminWrapper>
		<NoteForm :error="error" :factory="factory" :loading="loading" :submit="editNote"
			class="p-8 bg-white rounded-xl">
			<template v-slot:buttonText>
				Update Note
			</template>
		</NoteForm>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import { getEditingNote, useEditNote } from '@app/composable/study/notes'
import NoteForm from '@app/components/study/notes/NoteForm.vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'StudyNotesNoteIdEdit',
	displayName: 'Edit Note',
	components: { AdminWrapper, NoteForm },
	middlewares: ['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { noteId } = to.params
		const note = getEditingNote()
		if (!note || note.id !== noteId) return '/study/notes/'
		const canEdit = note.userId === id.value
		if (!canEdit) return `/study/notes/${note.id}`
	}],
	setup () {
		const route = useRoute()
		const { loading, error, factory, editNote } = useEditNote(route.params.noteId as string)
		return { loading, error, factory, editNote }
	}
})
</script>
