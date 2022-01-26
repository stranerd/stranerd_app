<template>
	<AdminWrapper>
		<NoteForm :error="error" :factory="factory" :loading="loading" :submit="createNote"
			class="p-8 bg-white rounded-xl">
			<template v-slot:buttonText>
				Add Note
			</template>
		</NoteForm>
	</AdminWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AdminWrapper from '@app/components/admin/AdminWrapper.vue'
import { useCreateNote } from '@app/composable/study/notes'
import NoteForm from '@app/components/study/notes/NoteForm.vue'

export default defineComponent({
	name: 'AdminStudyNotesCreate',
	displayName: 'Administration',
	components: { AdminWrapper, NoteForm },
	middlewares: ['isAdmin'],
	setup () {
		const { loading, error, factory, createNote } = useCreateNote()
		return { loading, error, factory, createNote }
	}
})
</script>
