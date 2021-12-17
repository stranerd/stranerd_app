<template>
	<ExploreWrapper>
		<div>
			<EmptyState v-if="notes.length === 0" info="No available notes" />
			<ExploreNotesList :notes="notes" />
			<PageLoading v-if="loading" />
		</div>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import ExploreWrapper from '@app/components/study/explore/ExploreWrapper.vue'
import { useNoteList } from '@app/composable/study/notes'
import ExploreNotesList from '@app/components/study/notes/ExploreNotesList.vue'

export default defineComponent({
	name: 'ExploreNotes',
	displayName: 'Explore',
	components: { ExploreWrapper, ExploreNotesList },
	setup () {
		const { notes, listener, loading, error } = useNoteList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { notes, loading, error }
	}
})
</script>
