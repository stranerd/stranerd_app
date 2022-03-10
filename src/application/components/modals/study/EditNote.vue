<template>
	<Modal>
		<template v-slot:title>
			Edit Note
		</template>
		<NoteForm :error="error" :factory="factory" :loading="loading" :submit="editNote">
			<template v-slot:buttonText>Update folder</template>
		</NoteForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEditNote } from '@app/composable/study/notes'
import NoteForm from '@app/components/study/notes/NoteForm.vue'

export default defineComponent({
	name: 'EditNoteModal',
	components: { NoteForm },
	setup () {
		const { editNote, factory, error, loading } = useEditNote()
		return { error, loading, editNote, factory }
	}
})
</script>
