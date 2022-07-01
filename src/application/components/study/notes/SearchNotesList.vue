<template>
	<div class="showcase-flex">
		<EmptyState v-if="filtered.length === 0" info="No results found." />
		<NoteListCard v-for="note in filtered" :key="note.hash" :note="note" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
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
	},
	setup (props) {
		const filtered = computed(() => props.notes.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
