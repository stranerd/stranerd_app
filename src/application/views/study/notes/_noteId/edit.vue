<template>
	<Justified>
		<div class="p-4 lg:w-8/12 w-full mx-auto">
			<NoteForm :error="error" :factory="factory" :loading="loading" :submit="editNote"
				class="p-4 md:p-8 bg-white">
				<template v-slot:buttonText>
					Update Note
				</template>
			</NoteForm>
		</div>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getEditingNote, useEditNote } from '@app/composable/study/notes'
import NoteForm from '@app/components/study/notes/NoteForm.vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import Justified from '@app/layouts/Justified.vue'

export default defineComponent({
	name: 'StudyNotesNoteIdEdit',
	displayName: 'Edit Note',
	components: { Justified, NoteForm },
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
