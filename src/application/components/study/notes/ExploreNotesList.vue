<template>
	<div>
		<EmptyState v-if="!loading && !error && filtered.length === 0" info="No notes found." />
		<div class="showcase">
			<NoteListCard v-for="note in filtered" :key="note.hash" :note="note" />
		</div>
		<div v-if="hasMore && !sliced"
			class="text-center py-8 text-lg text-primary w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderNotes">Load More</a>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { useNoteList } from '@app/composable/study/notes'

export default defineComponent({
	name: 'ExploreNotesList',
	components: { NoteListCard },
	props: {
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const { loading, error, notes, hasMore, fetchOlderNotes } = useNoteList()
		const filtered = computed(() => notes.value.slice(0, props.sliced ? 6 : undefined))
		return { filtered, loading, error, hasMore, fetchOlderNotes }
	}
})
</script>
