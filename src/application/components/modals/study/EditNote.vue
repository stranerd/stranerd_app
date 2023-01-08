<template>
	<Modal :close="close">
		<template v-slot:title>
			Edit Note
		</template>
		<NoteForm :error="error" :factory="factory" :loading="loading" :submit="editNote">
			<template v-slot:buttonText>Save</template>
		</NoteForm>
	</Modal>
</template>

<script lang="ts" setup>
import { useEditNote } from '@app/composable/study/notes'
import NoteForm from '@app/components/study/notes/NoteForm.vue'

defineProps({
	close: {
		type: Function,
		required: true
	}
})

const { editNote, factory, error, loading } = useEditNote()
</script>
