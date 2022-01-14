<template>
	<ExploreWrapper>
		<ExploreNotesList />
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreNotesList from '@app/components/study/notes/ExploreNotesList.vue'

export default defineComponent({
	name: 'ExploreNotes',
	displayName: 'Explore',
	components: { ExploreWrapper, ExploreNotesList }
})
</script>
