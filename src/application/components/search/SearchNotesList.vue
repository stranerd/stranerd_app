<template>
	<div class="showcase-flex !p-0">
		<EmptyState v-if="notes.length === 0" info="No notes found." />
		<NoteListCard v-for="note in notes" :key="note.hash" :note="note" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { NoteEntity } from '@modules/study'

export default defineComponent({
	name: 'SearchNotesList',
	components: { NoteListCard },
	props: {
		notes: {
			type: Array as PropType<NoteEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	}
})
</script>
