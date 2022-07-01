<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<NoteForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createNote"
			class="h-full"
		/>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import NoteForm from '@app/components/study/notes/NoteForm.vue'
import { useCreateNote } from '@app/composable/study/notes'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'NotesCreate',
	components: { NoteForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Create Note', { back: true })
		const { factory, error, loading, createNote } = useCreateNote()
		return { factory, error, loading, createNote }
	}
})
</script>
