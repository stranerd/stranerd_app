<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="h-full flex flex-col">
			<BlockLoading v-if="loading" />
			<NoteDetails v-else-if="note" :note="note" class="h-full" />
			<NotFound v-else title="Note not found" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useNote } from '@app/composable/study/notes'
import NoteDetails from '@app/components/study/notes/NoteDetails.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyNotesNoteId',
	components: { NoteDetails },
	setup () {
		useRouteMeta('Note', { back: true })
		const { noteId } = useRoute().params
		const { error, loading, note } = useNote(noteId as string)
		return { loading, note, error }
	}
})
</script>
