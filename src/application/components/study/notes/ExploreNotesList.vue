<template>
	<div>
		<EmptyState v-if="filtered.length === 0" info="No notes found." />
		<div v-else class="showcase">
			<NoteListCard v-for="note in filtered" :key="note.hash" :note="note"
				:openMenu="(event) => openMenu(note, event)" />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { NoteEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'
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
		const { loading, error, listener, notes, hasMore } = useNoteList()
		const openMenu = (entity: NoteEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const filtered = computed(() => notes.value.slice(0, props.sliced ? 6 : undefined))
		onMounted(listener.startListener)
		onUnmounted(listener.closeListener)
		return { filtered, openMenu, loading, error, hasMore }
	}
})
</script>
