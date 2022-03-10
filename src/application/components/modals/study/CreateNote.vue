<template>
	<Modal>
		<template v-slot:title>
			Upload a note
		</template>
		<NoteForm :error="error" :factory="factory" :loading="loading" :submit="createNote"
			class="p-4 md:p-8 bg-white">
			<template v-slot:buttonText>
			</template>
		</NoteForm>
	</Modal> 
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateNote } from '@app/composable/study/notes'
import NoteForm from '@app/components/study/notes/NoteForm.vue'

export default defineComponent({
	name: 'CreateSetModal',
	components: { NoteForm },
	setup () {
		const { createNote, factory, error, loading } = useCreateNote()
		return { error, loading, createNote, factory }
	}
})
</script>
