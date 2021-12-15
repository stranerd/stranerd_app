<template>
	<div>
		<template v-if="notes.length === 0">
			<div class="py-3">
				<EmptyState info="No notes available." />
			</div>
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-8">
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

<style scoped>
	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
	}

	ion-segment {
		--background: #F7F7FC;
		color: #8B9EB1;
		font-weight: bold;
	}

	ion-segment-button {
		--background-checked: #4D5C6F;
		--background-focused: #4D5C6F;
		--indicator-color: #4D5C6F;
		--indicator-box-shadow: none;
		--padding-top: 0.5rem;
		--padding-bottom: 0.5rem;
		color: #8B9EB1;
		font-weight: bold;
	}
</style>
