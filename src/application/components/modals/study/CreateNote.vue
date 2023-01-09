<template>
	<Modal :close="close">
		<template v-slot:title>
			Create a note
		</template>
		<NoteForm :error="error" :factory="factory" :loading="loading" :submit="createNote">
			<template v-slot:buttonText>
				Save
			</template>
		</NoteForm>
	</Modal>
</template>

<script lang="ts" setup>
import { useCreateNote } from '@app/composable/study/notes'
import NoteForm from '@app/components/study/notes/NoteForm.vue'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { createNote, factory, error, loading } = useCreateNote()
</script>
