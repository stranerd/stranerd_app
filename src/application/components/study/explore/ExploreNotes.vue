<template>
	<div>
		<template v-if="notes.length === 0">
			<EmptyState info="No notes available." />
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
				<NoteListCard v-for="note in notes" :key="note.id" :note="note" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import NoteListCard from '@app/components/study/notes/NoteListCard.vue'
import { useNoteList } from '@app/composable/study/notes'

export default defineComponent({
	name: 'ExploreNotes',
	components: { NoteListCard },
	props: {
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup () {
		// const { id, isLoggedIn } = useAuth()
		const { notes, listener, loading, error } = useNoteList()

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			notes

		}
	}
})
</script>
