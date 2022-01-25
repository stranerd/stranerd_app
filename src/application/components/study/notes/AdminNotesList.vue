<template>
	<div>
		<EmptyState v-if="!loading && !error && notes.length === 0" info="No notes found." />
		<div>
			<NoteListCard v-for="note in notes" :key="note.hash" :note="note" class="mb-4" />
		</div>
		<div v-if="hasMore"
			class="text-center py-8 text-lg text-primary w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderNotes">Load More</a>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NoteListCard from '@app/components/study/notes/AdminNoteListCard.vue'
import { useNoteList } from '@app/composable/study/notes'

export default defineComponent({
	name: 'AdminNotesList',
	components: { NoteListCard },
	setup () {
		const { loading, error, notes, hasMore, fetchOlderNotes } = useNoteList()
		return { loading, error, notes, hasMore, fetchOlderNotes }
	}
})
</script>
