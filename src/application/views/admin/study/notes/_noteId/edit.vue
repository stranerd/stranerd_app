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

export default defineComponent({
	name: 'AdminStudyNotesNoteIdEditPage',
	displayName: 'Administration',
	components: { AdminWrapper, NoteForm },
	middlewares: ['isAdmin', async ({ to }) => {
		const { noteId } = to.params
		const note = getEditingNote()
		if (!note || note.id !== noteId) return '/admin/study/notes/'
	}],
	setup () {
		const route = useRoute()
		const { loading, error, factory, editNote } = useEditNote(route.params.noteId as string)
		return { loading, error, factory, editNote }
	}
})
</script>
